import React from "react";
import CardItem from "./CardItem";

import "./Cards.css";

function chunkArray(myArray, chunk_size) {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
}

const productsSection = (tittle, products) => {
  return (
    <>
      <h1>{tittle}</h1>
      {products.map((chunck) => {
        let id = 1;
        return (
          <div key={id++} className="cards__container">
            <div className="cards__wrapper">
              <ul className="cards__items">
                {chunck.map((product) => {
                  return <CardItem {...product} key={product.id} />;
                })}
              </ul>
              <ul className="cards__items"></ul>
            </div>
          </div>
        );
      })}
    </>
  );
};

export function TopCards(props) {
  const { products } = props.context;
  const tees = products.filter(function (product) {
    return product.label === "tee";
  });
  if (tees.length === 0) {
    // TODO wait for the async fetching: This won't be
    // needed in the future when the rating is implemented
    return <></>;
  }
  return (
    <div className="cards">
      {productsSection("Lucifer’s choice", [[tees[0], tees[2], tees[1]]])}
    </div>
  );
}

export function AllCards(props) {
  const { products } = props.context;
  const tees = chunkArray(
    products.filter(function (product) {
      return product.label === "tee";
    }),
    3
  );
  const hoodies = chunkArray(
    products.filter(function (product) {
      return product.label === "hoodie" || product.label === "jacket";
    }),
    3
  );

  return (
    <div className="cards">
      {productsSection("Check out these cool tees!", tees)}
      {productsSection("Check out these cool hoodies!", hoodies)}
    </div>
  );
}
