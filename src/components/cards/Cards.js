import React from "react";
import CardItem from "./CardItem";

import "./Cards.css";

// import { artWorks } from "../../test/artWorks";
import { hoodies } from "../../test/hoodies";
// import { prints } from "../../test/prints";
import { tees } from "../../test/tees";

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

const teesChunk = chunkArray(tees, 3);
const hoodiesChunk = chunkArray(hoodies, 3);
//const printsChunk = chunkArray(prints, 3);
//const artWorksChunk = chunkArray(artWorks, 3);

const productsSection = (tittle, products) => {
  return (
    <>
      <h1>{tittle}</h1>
      {products.map((chunck) => {
        return (
          <div className="cards__container">
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

export function TopCards() {
  return (
    <div className="cards">
      {productsSection("Lucifer’s choice", [[tees[0], tees[2], tees[1]]])}
    </div>
  );
}

export function AllCards() {
  return (
    <div className="cards">
      {productsSection("Check out these cool tees!", teesChunk)}
      {productsSection("Check out these cool hoodies!", hoodiesChunk)}
      {/*productsSection("Check out these cool prints!", printsChunk)*/}
      {/*productsSection("Check out these special artworks!", artWorksChunk)*/}
    </div>
  );
}
