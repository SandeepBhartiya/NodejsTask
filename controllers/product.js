import Products from "../models/product.js";

//This API call manage creation of new Product
export const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new Products(product);
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).send({ message: "Error while creating product" });
  }
};

//This API call manage calling all Product present in Database
export const allProduct = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).send(products);
  } catch (err) {
    console.log("Error", err.message);
    req.status(500).send({
      message: "Error while getting All products",
    });
  }
};

//This API call manage getting a product with a specific ID
export const getProduct = async (req, res) => {
  try {
    const params = req.params.id;
    const product = await Products.findOne({ _id: params });
    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.status(200).send(product);
    }
  } catch (err) {
    console.log("Erro", err.message);
    req.status(500).send({
      message: "Error while getting product",
    });
  }
};

//This API call manage updating a product with a specific ID
export const updateProductById = async (req, res) => {
  try {
    const params = req.params.id;
    const product = await Products.findOne({ _id: params });
    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      Object.assign(product, req.body);
      const updatedProduct = await product.save();
      res.status(200).send(updatedProduct);
    }
  } catch (err) {
    console.log("Erro", err.message);
    req.status(500).send({
      message: "Error while updating product",
    });
  }
};

//This API call manage deleting  a product with a specific ID
export const deleteProductById = async (req, res) => {
  try {
    const params = req.params.id;
    const product = await Products.findByIdAndDelete({ _id: params });
    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.status(200).send({ message: "Product deleted Successfully" });
    }
  } catch (err) {
    console.log("Erro", err.message);
    req.status(500).send({
      message: "Error while deleting product",
    });
  }
};
