import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/shop.css';
import Alert from '../components/Alert';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Unable to load products');
        setProducts(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  );

  const visibleProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = !searchTerm || [product.name, product.description, product.category]
        .some((value) => value?.toLowerCase().includes(searchTerm));
      return matchesCategory && matchesSearch;
    });
  }, [category, products, search]);

  return (
    <main className="shop-page">
      {/* Hero Section with public /images/hero.jpeg background */}
      <section
        className="shop-intro"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(28, 25, 23, 0.78) 0%, rgba(28, 25, 23, 0.42) 60%, rgba(28, 25, 23, 0.10) 100%), radial-gradient(circle at 85% 20%, rgba(212, 167, 44, 0.20), transparent 50%), url('/images/hero.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="shop-intro-inner">
          <span className="hero-badge">⚡ OFFICIAL AR SUNTECH STORE</span>
          <h1>Welcome to AR SUNTECH</h1>
          <p>Explore our complete catalog of premium electronics, gadgets, and tech accessories.</p>

          <div className="hero-actions-row">
            <a href="#products-catalog" className="btn btn-primary hero-btn">
              🛍️ Browse Products
            </a>
            <a href="https://wa.me/923113445000" target="_blank" rel="noreferrer" className="btn btn-wa hero-btn">
              💬 WhatsApp: 03113445000
            </a>
          </div>
        </div>
      </section>

      {/* Trust Features Banner */}
      <section className="features-strip">
        <div className="container features-container">
          <div className="feature-card">
            <span className="feature-icon">🚚</span>
            <div>
              <strong>Fast Nationwide Shipping</strong>
              <p>Delivery across all cities in Pakistan</p>
            </div>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💳</span>
            <div>
              <strong>Easy Payment Transfer</strong>
              <p>JazzCash (03113445000) & HBL Bank</p>
            </div>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <div>
              <strong>WhatsApp Support</strong>
              <p>Instant order help on 03113445000 / 03003127377</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog & Filtering */}
      <div id="products-catalog" className="container shop-container">
        <div className="shop-toolbar">
          <label className="shop-search-label">
            <span>Search Products</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by product name, category..."
            />
          </label>
          <label className="shop-category-label">
            <span>Filter Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <p className="shop-result-count">{visibleProducts.length} Products Available</p>
        </div>

        {/* Quick Category Chips */}
        {categories.length > 1 && (
          <div className="category-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-chip ${category === cat ? 'is-active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && <p className="shop-message">Loading catalog products...</p>}
        {error && <div className="shop-message shop-error"><Alert>{error}</Alert></div>}
        {!loading && !error && visibleProducts.length === 0 && (
          <div className="shop-empty">
            <h2>No products found</h2>
            <p>Try resetting your search query or selecting another category.</p>
            <button type="button" className="btn btn-secondary" onClick={() => { setSearch(''); setCategory('All'); }}>
              Reset Filters
            </button>
          </div>
        )}
        {!loading && !error && visibleProducts.length > 0 && (
          <div className="product-grid shop-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;