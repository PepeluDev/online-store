import React from "react";
// Components
import Button from "../button/Button";
import CartItem from "./CartItem";

// style
import "./cart.css";

function Cart(props) {
  const { clearCart, cartData, addToCart, removeFromCart } = props;
  const cartKeys = Object.keys(cartData || {});
  const totalPriceReducer = (accumulator, item) =>
    accumulator + item.price * item.amount;
  return (
    <div>
      <div className="cart__header">
        <h2>Your Cart</h2>
      </div>
      <div className="cart__items">
        {!cartKeys.length && <h2>EMPTY</h2>}
        {cartKeys.length > 0 &&
          cartKeys.map((id) => {
            return (
              <CartItem
                key={id}
                cartId={id}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                {...cartData[id]}
              />
            );
          })}
      </div>
      {cartKeys.length > 0 && (
        <div className="cart__total">
          <h2>
            Total:{" "}
            {Object.values(cartData).reduce(totalPriceReducer, 0).toFixed(2)}eur
          </h2>
        </div>
      )}
      {cartKeys.length > 0 && (
        <div className="cart__buttons">
          <Button
            buttonStyle="btn--secondary"
            buttonSize="btn--medium"
            onClick={() => clearCart()}
          >
            CLEAR CART
          </Button>
          <Button buttonStyle="btn--secondary" buttonSize="btn--medium">
            CHECK OUT
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
