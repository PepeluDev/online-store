const paypal = require("@paypal/checkout-server-sdk");
const router = require("express").Router();
let Product = require("../models/product.model");

// Paypal stuff
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET_ID;
// The sandbox environment, not live/production
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Async query to mongoDB to check prices
const getPrices = async (productIds) => {
  var prices;
  try {
    prices = await Product.find({
      _id: {
        $in: productIds,
      },
    })
      .select("price")
      .exec();
  } catch (err) {
    return "error occured";
  }
  return prices;
};

const getTotalPrice = (prices, orderProducts) => {
  const finalPrice = prices.reduce((accumulator, price) => {
    return accumulator + price.price * orderProducts[price._id].totalamount;
  }, 0.0);
  return Math.round(finalPrice * 100) / 100;
};

const createPaypalOrder = async (paypalRequest) => {
  // your client gets a response with the order id
  const response = await client.execute(paypalRequest);
  return { orderID: response.result.id };
};

router.route("/paypal/createorder").post((req, res) => {
  // checking that there is a request body
  // TODO: check the schema
  if (!req.body) {
    return res.status(400).send("Request Body is missing");
  }

  const idsArray = Object.keys(req.body);
  try {
    // we need to get the actual prices from mongo DB
    getPrices(idsArray)
      .then((prices) => {
        // The calculated price of the order
        const finalPrice = getTotalPrice(prices, req.body);
        // Create a request object and set parameters
        let request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: finalPrice + "", // Convert to string
                // TODO: will need to add the products
              },
            },
          ],
        });

        createPaypalOrder(request)
          .then((orderID) => {
            res.json(orderID);
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  } catch (err) {
    console.error(err);
    return res.send(500);
  }
});

// This will recieve the completed order
// will check that is completed and will
// store it in the database
router.route("/sendorder").post((req, res) => {
  if (!req.body) {
    return res.status(400).send("Request Body is missing");
  }

  // TODO: The order approval must the double checked
  console.log("The order: " + JSON.stringify(req.body));
  // The order will need to be added to the DB

  res.sendStatus(201);
});

module.exports = router;
