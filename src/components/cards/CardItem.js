import React, { useState } from "react";
import Button from "../button/Button";

import Carousel from "react-material-ui-carousel";
import Popup from "reactjs-popup";

function sizeSelector(availableSizes, onChange) {
  return (
    <select
      name="sizes"
      onChange={(e) => {
        e.preventDefault();
        onChange(e.target.value);
      }}
    >
      {availableSizes.map((s) => {
        return (
          <option key={s} value={s}>
            {s}
          </option>
        );
      })}
    </select>
  );
}

function ProductFigure({ src, label }) {
  return (
    <figure className="cards__item__pic-wrap" data-category={label}>
      <Popup
        modal
        closeOnDocumentClick
        trigger={
          <img src={src} alt="SOME_IMAGE" className="cards__item__img" />
        }
      >
        <img src={src} alt="SOME_IMAGE" className="cards__item__img__popup" />
      </Popup>
    </figure>
  );
}

function ProductCarousel({ picsSrc, label }) {
  if (picsSrc.length === 1) {
    return <ProductFigure src={picsSrc[0]} label={label} />;
  } else {
    let id = 1;
    return (
      <Carousel autoPlay={false}>
        {picsSrc.map((src) => {
          return <ProductFigure key={id++} src={src} label={label} />;
        })}
      </Carousel>
    );
  }
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
  addToCart,
}) {
  let initialSize = sizes.length > 0 ? sizes[0] : "no-size";
  const [size, setSize] = useState(initialSize);

  return (
    <>
      <li className="cards__item">
        <div className="cards__item__link">
          <ProductCarousel picsSrc={src} label={label} />
          <div className="cards__item__info">
            <h5 className="cards__item__text">{name}</h5>
            <p>{description}</p>
            {/* TODO currency must be selected depending on country */}
            <span>{price} euro</span>
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
                    console.log(id + " " + size);
                    addToCart({
                      id: id,
                      amount: 1,
                      name: name,
                      size: size,
                      src: src,
                      price: price,
                    });
                    setSize(initialSize);
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
