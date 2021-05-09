const paypal = require("@paypal/checkout-server-sdk");
const router = require("express").Router();
var EmailCtrl = require("../utils/emailer");
let Product = require("../models/product.model");
let Order = require("../models/order.model");

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
  const response = await client.execute(paypalRequest);
  return { orderID: response.result.id };
};

const storeOrder = async (orderID, orderItems, orderPrice, res) => {
  const orderJson = {
    paypalOrderID: orderID,
    orderItems: orderItems,
    orderPrice: orderPrice,
  };

  const newOrder = new Order(orderJson);
  const storedOrder = await newOrder.save();
  return storeOrder;
};


router.route("/paypal/createorder").post((req, res) => {
  // checking that there is a request body
  // TODO: check the schema
  if (!req.body) {
    return res.status(400).send("Request Body is missing");
  }
  const orderItems = Object.values(req.body).map( (item) => {
    console.log(item);
    return { productID : item.productId, name: item.name , sizes:item.sizes}
  });
  if(orderItems.length === 0){
    return res.status(400).send("The cart is empty.");
  }

  try {
    // we need to get the actual prices from mongo DB
    getPrices(Object.keys(req.body))
      .then((prices) => {
        // The calculated price of the order
        const finalPrice = getTotalPrice(prices, req.body);
        // Create a request object and set parameters
        let paypalRequest = new paypal.orders.OrdersCreateRequest();
        paypalRequest.prefer("return=representation");
        paypalRequest.requestBody({
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

        createPaypalOrder(paypalRequest)
          .then((orderID) => {
            // Store the order in database and not payed
            storeOrder(orderID.orderID, orderItems, finalPrice, res)
              .then((doc) => {
                if (!doc || doc.length === 0) {
                  return res.status(500).send(doc);
                }
                return res.json(orderID);
              })
              .catch((err) => {
                return res.status(500).json(err);
              });
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

const updateOrder = async (props) => {
  const { email, orderID, address } = props;
  await Order.updateOne(
    { paypalOrderID: orderID },
    {
      email: email,
      payed: true,
      address: address,
    }
  );

  // TODO:
  // - Send a transcription of the order in html bill
  Order.findOne({ paypalOrderID: orderID }).then((order) => {
    EmailCtrl.sendEmail(email, JSON.stringify(order));
  });
}

// This will recieve the completed order
// will check that is completed and will
// store it in the database
router.route("/sendorder").post((req, res) => {
  if (!req.body) {
    return res.status(400).send("Request Body is missing");
  }
  // TODO: confirm the order
  // The order will need to be added to the DB
  updateOrder({email: req.body.payer.email_address,orderID:req.body.id, address: JSON.stringify(req.body.purchase_units[0].shipping)});
  res.status(201).json({email: req.body.payer.email_address}).send();
});

module.exports = router;
