import express from "express";
import {
  createOrder,
  getAllOrder,
  getOrderById,
} from "../controllers/order.js";

const router = express.Router();

router.post("/create", createOrder); //Create a new Order
router.get("/", getAllOrder); //Retrive a list of all Orders
router.get("/:id", getOrderById); //Retrive a single order by ID
export default router;
