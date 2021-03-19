import React from "react";
// Components
import Cart from "./Cart";
import { Drawer } from "@material-ui/core";

function CartDrawer(props) {
  const { open, onClose, context } = props;
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      <Cart
        cartData={context.cart}
        addToCart={context.addToCart}
        removeFromCart={context.removeFromCart}
        clearCart={context.clearCart}
      />
    </Drawer>
  );
}

export default CartDrawer;
