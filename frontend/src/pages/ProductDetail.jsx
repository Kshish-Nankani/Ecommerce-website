import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Alert from '../components/Alert';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductAndAll = async () => {
      setLoading(true);
      try {
        const [resProduct, resAll] = await Promise.all([
          fetch(`/api/products/${id}`),
          fetch('/api/products')
        ]);
        
        if (resProduct.ok) {
          const data = await resProduct.json();
          setProduct(data);
          setCurrentImageIndex(0);
        }

        if (resAll.ok) {
          const allData = await resAll.json();
          setAllProducts(Array.isArray(allData) ? allData : []);
        }
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndAll();
  }, [id]);

  // Combine images of current product and all other available products into gallery catalog
  const catalogImages = useMemo(() => {
    if (!product) return [];
    const list = [];
    const currentImgs = Array.isArray(product.imageUrl)
      ? product.imageUrl.filter(Boolean)
      : [product.imageUrl].filter(Boolean);

    currentImgs.forEach((url, i) => {
      list.push({
        url,
        name: product.name,
        price: product.price,
        productId: product._id,
        isCurrent: true,
        label: `Image ${i + 1} of ${product.name}`
      });
    });

    allProducts.forEach((p) => {
      if (p._id !== product._id) {
        const pImgs = Array.isArray(p.imageUrl)
          ? p.imageUrl.filter(Boolean)
          : [p.imageUrl].filter(Boolean);
        pImgs.forEach((url) => {
          list.push({
            url,
            name: p.name,
            price: p.price,
            productId: p._id,
            isCurrent: false,
            label: p.name
          });
        });
      }
    });

    return list.length > 0
      ? list
      : [{ url: '/images/placeholder.jpg', name: product.name, price: product.price, productId: product._id, isCurrent: true, label: product.name }];
  }, [product, allProducts]);

  const activeSlide = catalogImages[currentImageIndex] || catalogImages[0];
  const priceValue = Number(product?.price ?? 0);

  const handleNextImage = () => {
    if (catalogImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % catalogImages.length);
  };

  const handlePrevImage = () => {
    if (catalogImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + catalogImages.length) % catalogImages.length);
  };

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        _id: product._id,
        productId: product._id,
        name: product.name,
        price: Number(product.price),
        imageUrl: activeSlide?.url || product.imageUrl || '',
        qty: 1,
      })
    );

    setCartMessage('Successfully added to your cart.');
  };

  if (loading) {
    return (
      <div className="product-detail-feedback">
        <Alert variant="info" role="status">Loading product details...</Alert>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-feedback">
        <Alert>Product not found.</Alert>
      </div>
    );
  }

  return (
    <main className="product-detail-page">
      <div className="container product-detail-container">
        <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/">Shop</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <section className="product-detail-card">
          <div className="product-detail-gallery">
            <div className="product-detail-slider-container">
              <div className="product-detail-slider-wrap">
                {catalogImages.length > 1 && (
                  <button
                    type="button"
                    className="slider-nav-btn slider-nav-left"
                    onClick={handlePrevImage}
                    aria-label="Previous slide"
                  >
                    ‹
                  </button>
                )}

                <div className="slider-main-slide">
                  <img
                    src={activeSlide?.url || '/images/placeholder.jpg'}
                    alt={activeSlide?.name || product.name}
                    className="product-detail-main-image"
                    key={activeSlide?.url}
                  />

                  {!activeSlide?.isCurrent && (
                    <Link
                      to={`/products/${activeSlide.productId}`}
                      className="slider-product-badge"
                    >
                      <span className="badge-title">🛍️ {activeSlide.name}</span>
                      <span className="badge-price">${Number(activeSlide.price || 0).toFixed(2)}</span>
                      <span className="badge-link">View Product →</span>
                    </Link>
                  )}
                </div>

                {catalogImages.length > 1 && (
                  <button
                    type="button"
                    className="slider-nav-btn slider-nav-right"
                    onClick={handleNextImage}
                    aria-label="Next slide"
                  >
                    ›
                  </button>
                )}
              </div>

              {/* Bottom Pagination Control pill matching user reference image */}
              {catalogImages.length > 1 && (
                <div className="slider-bottom-controls">
                  <button
                    type="button"
                    className="slider-mini-arrow"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>

                  <div className="slider-dots-pill">
                    {catalogImages.slice(0, 8).map((item, idx) => (
                      <button
                        key={`${item.url}-${idx}`}
                        type="button"
                        className={`slider-dot ${currentImageIndex === idx ? 'is-active' : ''}`}
                        onClick={() => setCurrentImageIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                    {catalogImages.length > 8 && (
                      <span className="slider-counter-badge">
                        {currentImageIndex + 1}/{catalogImages.length}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="slider-mini-arrow"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </div>
              )}

              {/* Thumbnails strip for available product images */}
              {catalogImages.length > 1 && (
                <div className="product-detail-thumbnails">
                  {catalogImages.slice(0, 6).map((imageItem, index) => (
                    <button
                      key={`${imageItem.url}-${index}`}
                      type="button"
                      className={`product-detail-thumbnail ${currentImageIndex === index ? 'is-active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      title={imageItem.name}
                    >
                      <img src={imageItem.url} alt={imageItem.name} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="product-detail-info">
            {cartMessage && <Alert variant="success" role="status">{cartMessage}</Alert>}
            <p className="product-detail-category">{product.category}</p>
            <h1>{product.name}</h1>

            <div className="product-detail-meta">
              <span className="product-detail-price">
                ${Number.isFinite(priceValue) ? priceValue.toFixed(2) : '0.00'}
              </span>
              <span className={`product-detail-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                Add to cart
              </button>
              <Link to="/" className="btn btn-secondary product-detail-secondary">
                Continue shopping
              </Link>
            </div>

            <div className="product-detail-trust-grid">
              <div className="trust-badge-item">
                <span className="trust-icon">🔒</span>
                <div>
                  <strong>100% Secure Checkout</strong>
                  <p>No account required</p>
                </div>
              </div>
              <div className="trust-badge-item">
                <span className="trust-icon">💳</span>
                <div>
                  <strong>Easy Payment Transfer</strong>
                  <p>JazzCash & HBL Bank</p>
                </div>
              </div>
              <div className="trust-badge-item">
                <span className="trust-icon">💬</span>
                <div>
                  <strong>WhatsApp Support</strong>
                  <p>Instant order assistance</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetail;