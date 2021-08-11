import React, { useState } from "react";
import Button from "../button/Button";

import Carousel from "react-material-ui-carousel";

import { Card } from "react-bootstrap";

function sizeSelector(availableSizes, onChange) {
  return (
    <select
      style={{ margin: "6px" }}
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
  return <Card.Img variant="top" src={src} style={{ borderRadius: "20px" }} />;
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
      <Card
        style={{
          border: "solid",
          borderRadius: "10px",
          margin: "10px",
          borderColor: "lightGray",
        }}
      >
        <ProductCarousel picsSrc={src} label={label} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>

        <Card.Footer style={{ borderRadius: "10px", textAlign: "center" }}>
          <span>{price} euro</span>
          <div className="cards__item__form">
            <form>
              {(label === "tee" || label === "hoodie" || label === "jacket") &&
                sizeSelector(sizes, setSize)}
              <Button
                buttonStyle="btn--secondary"
                buttonSize="btn--small"
                onClick={(e) => {
                  e.preventDefault();
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
        </Card.Footer>
      </Card>
    </>
  );
}

export default CardItem;
