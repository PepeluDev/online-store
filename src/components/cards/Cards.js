import React from "react";
import CardItem from "./CardItem";
import { Container, CardGroup } from "react-bootstrap";

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

const productsSection = (tittle, products, addToCart) => {
  return (
        <Container style={{marginTop:"10px"}}>
        <h1 style={{textAlign:"center", fontFamily: "Courier New, Courier, monospace" }} >{tittle}</h1>
          {products.map((chunck) => {
            let id = 1;
            return (
              <CardGroup xs={1} md={3} className="g-4" key={id++}>
                    {chunck.map((product) => {
                      return (
                            <CardItem
                              key={product._id}
                              id={product._id} // Mongo uses _id
                              {...product}
                              addToCart={addToCart}
                            />
                      );
                    })}
            </CardGroup>
            );
          })}
      </Container>
  );
};

export function TopCards(props) {
  const { products, addToCart } = props.context;
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
      {productsSection(
        "Latest releases",
        [[tees[0], tees[2], tees[1]]],
        addToCart
      )}
    </div>
  );
}

export function AllCards(props) {
  const { products, addToCart } = props.context;
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
      {productsSection("Our Tees", tees, addToCart)}
      {productsSection("Our Hoodies", hoodies, addToCart)}
    </div>
  );
}
