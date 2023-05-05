//import all the necessary file
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//import the routerApi Page
import ProductApi from "./routes/product.js";
import OrderApi from "./routes/order.js";

const app = express();
dotenv.config();

//Middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//importing the .env file
const PORT = process.env.PORT || 9000;
const DB = process.env.DB_URL;

//Middelwares
app.use("/products", ProductApi);
app.use("/orders", OrderApi);

//Database connection
mongoose
  .connect(DB)
  .then(() => {
    //listening to the specific port

    app.listen(PORT, () => {
      console.log(`Listening at ${PORT}`);
    });
    console.log("Connected....");
  })
  .catch((err) => {
    //Error happen when DB is not Connected
    console.log("Error", err.message);
  });
