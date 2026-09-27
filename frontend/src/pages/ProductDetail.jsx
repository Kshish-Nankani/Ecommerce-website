import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Alert from '../components/Alert';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }

        const data = await res.json();
        setProduct(data);
        setCurrentImageIndex(0);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const imageList = product
    ? Array.isArray(product.imageUrl)
      ? product.imageUrl.filter(Boolean)
      : [product.imageUrl].filter(Boolean)
    : [];

  const priceValue = Number(product?.price ?? 0);

  const handleNextImage = () => {
    if (imageList.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  };

  const handlePrevImage = () => {
    if (imageList.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        _id: product._id,
        productId: product._id,
        name: product.name,
        price: Number(product.price),
        imageUrl: imageList[currentImageIndex] || imageList[0] || '',
        qty: 1,
      })
    );

    setCartMessage('Successfully added to your cart.');
  };

  if (loading) {
    return (
      <div className="product-detail-feedback"><Alert variant="info" role="status">Loading product...</Alert></div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-feedback"><Alert>Product not found.</Alert></div>
    );
  }

  const activeImage = imageList[currentImageIndex] || imageList[0] || '/images/placeholder.jpg';

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
            <div className="product-detail-slider-wrap">
              <img
                src={activeImage}
                alt={product.name}
                className="product-detail-main-image"
                key={activeImage}
              />

              {imageList.length > 1 && (
                <>
                  <button
                    type="button"
                    className="slider-arrow slider-arrow-left"
                    onClick={handlePrevImage}
                    aria-label="Previous product image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="slider-arrow slider-arrow-right"
                    onClick={handleNextImage}
                    aria-label="Next product image"
                  >
                    ›
                  </button>
                  <span className="slider-counter">
                    {currentImageIndex + 1} / {imageList.length}
                  </span>
                </>
              )}
            </div>

            {imageList.length > 1 && (
              <div className="product-detail-thumbnails">
                {imageList.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className={`product-detail-thumbnail ${currentImageIndex === index ? 'is-active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
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