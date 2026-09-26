import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart, updateQuantity } from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.qty) || 1;
    return total + price * quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="container cart-empty-state">
          <p className="cart-eyebrow">AR SUNTECH CART</p>
          <h1>Your cart is empty</h1>
          <p>Add something you love and it will appear here.</p>
          <Link to="/" className="btn btn-primary">Continue shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container cart-page-container">
        <div className="cart-heading">
          <div>
            <p className="cart-eyebrow">AR SUNTECH CART</p>
            <h1>Your shopping cart</h1>
          </div>
          <button type="button" className="cart-clear-button" onClick={() => dispatch(clearCart())}>
            Clear cart
          </button>
        </div>

        <div className="cart-layout">
          <section className="cart-items" aria-label="Cart items">
            {cartItems.map((item) => {
              const image = Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl;
              const quantity = Number(item.qty) || 1;
              const price = Number(item.price) || 0;

              return (
                <article className="cart-item" key={item._id}>
                  <img src={image || '/images/placeholder.jpg'} alt={item.name} />
                  <div className="cart-item-info">
                    <h2>{item.name}</h2>
                    <p>${price.toFixed(2)} each</p>
                    <div className="cart-quantity-control">
                      <button
                        type="button"
                        onClick={() => dispatch(updateQuantity({ itemId: item._id, quantity: quantity - 1 }))}
                        disabled={quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span aria-label={`Quantity ${quantity}`}>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => dispatch(updateQuantity({ itemId: item._id, quantity: quantity + 1 }))}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <strong>${(price * quantity).toFixed(2)}</strong>
                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() => dispatch(removeFromCart(item._id))}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </article>
              );
            })}
          </section>

          <aside className="cart-summary">
            <p>Order summary</p>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div className="cart-summary-row cart-summary-muted">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <Link to="/checkout" className="btn btn-primary cart-checkout-button">Checkout</Link>
            <Link to="/" className="cart-continue-link">Continue shopping</Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
