import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    products: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "product",
      default: [],
    },
    totalPrice: Number
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

export default Order;
