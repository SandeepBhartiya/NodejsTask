import express from "express";
import {
  createProduct,
  allProduct,
  getProduct,
  updateProductById,
  deleteProductById
} from "../controllers/product.js";

const router = express.Router();

router.post("/create", createProduct); //Create a new Product
router.get("/", allProduct); //Retrive a list of all Products
router.get("/:id", getProduct); //Retrive a single product by ID
router.put("/:id", updateProductById); //Update a product by ID
router.delete("/:id",deleteProductById); //Delete a product by ID
export default router;
