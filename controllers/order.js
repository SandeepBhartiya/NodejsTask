import Order from "../models/order.js";
import Products from "../models/product.js";

//This API call manage creation of new Order
export const createOrder = async (req, res) => {
  try {
    const products = req.body.products;
    let price = 0;
    for (const prod of products) {
      const product = await Products.findById(prod);
      price += product.price;
    }
    const order = { products: req.body.products, totalPrice: price };
    const newOrder = new Order(order);
    newOrder.save();
    res.status(201).json({ message: "Order created" });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ message: "Error creating order" });
  }
};
//This API call manage calling all Order present in Database
export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();

    const orderArray = [];
    for (const order of orders) {
      const products = await order.products;
      const productsArray = [];
      for (const prod of products) {
        const product = await Products.findById(prod);
        productsArray.push(product);
      }
      const orderObject = {
        id: order._id,
        products: productsArray,
        totalPrice: order.totalPrice,
      };
      orderArray.push(orderObject);
    }
    res.status(201).json(orderArray);
  } catch (err) {
    console.log("Error", err.message);
    res
      .status(500)
      .json({ message: "Error while getting all order present in database" });
  }
};

//This API call manage getting a order with a specific ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const orderArray = [];
    if (!order) {
      return res.status(400).send({
        message: "Order is not Present",
      });
    }
    const products = await order.products;
    const productsArray = [];
    for (const prod of products) {
      const product = await Products.findById(prod);
      if (!product) {
        return res.status(400).send({
          message: "Product  is not present",
        });
      }
      productsArray.push(product);
    }
    const orderValue = {
      id: order._id,
      products: productsArray,
      totalPrice: order.totalPrice,
    };
    orderArray.push(orderValue);
    res.status(200).send(orderArray);
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).send({
      message: "Error while getting specific order by ID",
    });
  }
};
