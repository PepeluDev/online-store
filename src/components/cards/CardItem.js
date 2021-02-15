import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";

import Popup from "reactjs-popup";

function CardItem({
  id,
  brand,
  description,
  label,
  name,
  path,
  price,
  src,
  text,
}) {
  return (
    <>
      <li className="cards__item">
        <div className="cards__item__link">
          <figure className="cards__item__pic-wrap" data-category={label}>
            <Popup
              modal
              closeOnDocumentClick
              trigger={
                <img src={src} alt="SOME_IMAGE" className="cards__item__img" />
              }
            >
              <img
                src={src}
                alt="SOME_IMAGE"
                className="cards__item__img__popup"
              />
            </Popup>
          </figure>
          <div className="cards__item__info">
            <Link to={path}>
              <h5 className="cards__item__text">{name}</h5>
            </Link>
            <p>{description}</p>
            <Button buttonStyle="btn--secondary" buttonSize="btn--small">
              Add to cart
            </Button>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;
