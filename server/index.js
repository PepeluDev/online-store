const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(cors());
// what body parser should do
app.use(express.json());

// Mongo Connection
const mongoUri = process.env.MONGO_ATLAS_URI;
mongoose.connect(mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection stablished successfully.");
});
// Mongo Connection

// Request logger, middleware function
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});
const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

// Error 404, middleware function
app.use((req, res, next) => {
  res.status(404).send("Those are not the droids you are looking for.");
});

// Error 500, middleware function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server error.");
});

// Start the server
app.listen(port, () => {
  console.log("Server started on port: " + port);
});
