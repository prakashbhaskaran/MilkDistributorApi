const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    customername: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 5,
      max: 20,
    },
    placed: {
      type: Boolean,
      default: 1,
    },
    packed: {
      type: Boolean,
      default: 0,
    },
    dispatched: {
      type: Boolean,
      default: 0,
    },
    delivered: {
      type: Boolean,
      default: 0,
    },
    orderDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
