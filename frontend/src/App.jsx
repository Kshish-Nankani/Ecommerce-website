import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Legal from './pages/Legal';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminPage from './admin/AdminPage';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import VerifyOTP from './pages/VerifyOTP';
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Legal />} />
        <Route path="/terms" element={<Legal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/products" element={<AdminPage />} />
        <Route path="/admin/orders" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
