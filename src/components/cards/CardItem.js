import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";

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
        <Link className="cards__item__link" to={path}>
          <figure className="cards__item__pic-wrap" data-category={label}>
            <img src={src} alt="SOME_IMAGE" className="cards__item__img" />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{name}</h5>
            <p>{description}</p>
            <Button buttonStyle="btn--secondary" buttonSize="btn--small">
              Add to cart
            </Button>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
