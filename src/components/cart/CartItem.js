import React from "react";
// Components
import Button from "../button/Button";

// style
import "./cart.css";

function CartItem(props) {
  const {
    cartId,
    id,
    amount,
    name,
    size,
    src,
    price,
    removeFromCart,
    addToCart,
  } = props;
  return (
    <div className="cart__item">
      <h3>
        {name} {size}
      </h3>
      <div className="cart__item__information">
        <div className="cart__item__data">
          <p>price: {price}eur</p>
          <p>total: {(price * amount).toFixed(2)}eur</p>

          <div className="cart__item__buttons">
            <Button
              buttonStyle="btn--secondary"
              buttonSize="btn--small"
              onClick={() => removeFromCart(cartId)}
            >
              -
            </Button>
            <p>{amount}</p>
            <Button
              buttonStyle="btn--secondary"
              buttonSize="btn--small"
              onClick={() =>
                addToCart({
                  id: id,
                  amount: 1,
                  name: name,
                  size: size,
                  src: src,
                  price: price,
                })
              }
            >
              +
            </Button>
          </div>
        </div>
        <img src={src[0]} alt={name} className="cart__item__img" />
      </div>
    </div>
  );
}

export default CartItem;
