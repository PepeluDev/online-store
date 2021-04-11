import React from "react";
// Components
import { PayPalButton } from "react-paypal-button-v2";

// Style
import "./paypalCustomButton.css";

// It creates the structure to be sent to the server
const orderReducer = (cartData) => {
  let accumulator = {};
  for (const [, item] of Object.entries(cartData)) {
    if (item.id in accumulator) {
      if (item.size in accumulator[item.id].sizes) {
        accumulator[item.id].sizes[item.size] += item.amount;
      } else {
        accumulator[item.id].sizes[item.size] = item.amount;
      }
      accumulator[item.id].totalamount += item.amount;
    } else {
      accumulator[item.id] = { productId: item.id, name: item.name, sizes: {} };
      accumulator[item.id].sizes[item.size] = item.amount;
      accumulator[item.id].totalamount = item.amount;
    }
  }
  return accumulator;
};

const createOrder = (cartData) => {
  const cartOrders = orderReducer(cartData);
  if (Object.keys(cartOrders).size === 0) {
    alert("Your cart is empty!");
    return;
  }
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartOrders),
  };
  return fetch("/v1/payments/paypal/createorder", requestOptions)
    .then((response) => response.json())
    .catch((error) => alert(error))
    .then((data) => {
      return data.orderID;
    });
};

const onApprove = (data, actions, clearCart) => {
  return actions.order.capture().then(function (details) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    };
    return fetch("/v1/payments/sendorder", requestOptions)
      .then((response) => response.json())
      .catch((error) => alert(error))
      .then((data) => {
        alert("A confirmation email will be sent to: \n" + data.email);
        clearCart();
      });
  });
};

function PaypalCustomButton(props) {
  const { cartData, clearCart } = props;

  return (
    <div className="paypal__custom__button__wrapper">
      <PayPalButton
        currency="EUR"
        options={{ currency: "EUR" }}
        createOrder={() => createOrder(cartData)}
        onApprove={(data, actions) => {
          return onApprove(data, actions, clearCart);
        }}
      />
    </div>
  );
}

export default PaypalCustomButton;
