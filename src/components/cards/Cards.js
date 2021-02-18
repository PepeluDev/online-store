import React from "react";
import CardItem from "./CardItem";

import "./Cards.css";

import { artWorks } from "../../test/artWorks";
import { hoodies } from "../../test/hoodies";
import { prints } from "../../test/prints";
import { tees } from "../../test/tees";

const productsSection = (tittle, products) => {
  return (
    <>
      <h1>{tittle}</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {products.map((product) => {
              return <CardItem {...product} key={product.id} />;
            })}
          </ul>
          <ul className="cards__items"></ul>
        </div>
      </div>
    </>
  );
};

export function TopCards() {
  return (
    <div className="cards">
      {productsSection("Lucifer’s choice", [tees[0], tees[2], tees[4]])}
    </div>
  );
}

export function AllCards() {
  return (
    <div className="cards">
      {productsSection("Check out these cool tees!", tees)}
      {productsSection("Check out these cool hoodies!", hoodies)}
      {productsSection("Check out these cool prints!", prints)}
      {productsSection("Check out these special artworks!", artWorks)}
    </div>
  );
}
