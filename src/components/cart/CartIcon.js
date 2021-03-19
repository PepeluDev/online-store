import React from "react";
import { Badge } from "@material-ui/core";

function CartIcon(props) {
  const { context } = props;
  const totalItemsReducer = (accumulator, item) => accumulator + item.amount;
  return (
    <>
      <Badge
        badgeContent={Object.values(context.cart).reduce(totalItemsReducer, 0)}
        color="error"
      >
        <i className="ri-shopping-cart-line" />
      </Badge>
    </>
  );
}

export default CartIcon;
