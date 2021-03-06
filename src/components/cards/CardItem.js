import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";

import Popup from "reactjs-popup";

function sizeSelector(availableSizes, onChange) {
  return (
    <select
      name="cars"
      id="cars"
      onChange={(e) => {
        e.preventDefault();
        onChange(e.target.value);
      }}
    >
      {availableSizes.map((s) => {
        return <option value={s}>{s}</option>;
      })}
    </select>
  );
}

function CardItem({
  id,
  brand,
  description,
  label,
  name,
  path,
  price,
  sizes,
  src,
  text,
}) {
  const [size, setSize] = useState("default");

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
            {/* TODO currency must be selected depending on country */}
            <span>{price} euro</span>{" "}
            <div className="cards__item__form">
              <form>
                {(label === "tee" ||
                  label === "hoodie" ||
                  label === "jacket") &&
                  sizeSelector(sizes, setSize)}
                <Button
                  buttonStyle="btn--secondary"
                  buttonSize="btn--small"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(size);
                    // Addd to cart will be here
                  }}
                >
                  Add to cart
                </Button>
              </form>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;
