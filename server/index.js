const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// what body parser should do
app.use(express.json());

// link with frontend
const frontEndBuildPath = path.join(__dirname, "..", "build");
app.use("/", express.static(frontEndBuildPath));
app.use("/products", express.static(frontEndBuildPath));

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

// Actual routes
const productsRouter = require("./routes/products");
const paymentRouer = require("./routes/payments");
app.use("/v1/products", productsRouter);
app.use("/v1/payments", paymentRouer);

// Error 404, middleware function
app.use((req, res, next) => {
  res.redirect(404, "/products");
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
