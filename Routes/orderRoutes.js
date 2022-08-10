const express = require("express");

const orderDetails = require("../Schema/orderSchema");

const orderRouter = express.Router();

let maxCapacity = 100;

//Add order
orderRouter.post("/add", async (req, res) => {
  try {
    const order = new orderDetails({
      customername: req.body.customername,
      quantity: req.body.quantity,
      orderDate: new Date().toLocaleDateString().replace(/\//g, "-"),
    });
    const results = await orderDetails.find();
    let values = results
      .filter((item) => item.orderDate === order.orderDate)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      }, 0);
    let sum = values + order.quantity;
    if (sum > maxCapacity) {
      throw new Error(`Only ${maxCapacity - values} Litres is available`);
    } else {
      const result = await order.save();
      res.json(result);
    }
  } catch (error) {
    res.json({ message: `${error.message}` });
  }
});

//Update order details
orderRouter.patch("/update/:id", async (req, res) => {
  try {
    const options = { new: true };
    const order = await orderDetails.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { quantity: req.body.quantity },
      options
    );
    const result = await order.save();
    res.json(result);
  } catch (error) {
    res.json({ message: "unsuccessful" });
  }
});

//Update order status
orderRouter.patch("/updateStatus/:id", async (req, res) => {
  try {
    const options = { new: true };
    const result = await orderDetails.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        placed: req.body.placed,
        packed: req.body.packed,
        dispatched: req.body.dispatched,
        delivered: req.body.delivered,
      },
      options
    );
    res.json(result);
  } catch (error) {
    res.json({ message: "unsuccessful" });
  }
});

//Delete Order
orderRouter.delete("/delete/:id", async (req, res) => {
  try {
    const result = await orderDetails.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: "Successfully Deleted" });
    }
  } catch (error) {
    res.json({ message: `${error.message}` });
  }
});

//Check capacity
orderRouter.get("/checkCapacity/:date", async (req, res) => {
  try {
    const results = await orderDetails.find();
    let values = results
      .filter((item) => item.orderDate === req.params.date)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      }, 0);
    let sum = maxCapacity - values;
    res.json({ message: `${sum} Litres are left for the day.` });
  } catch (error) {
    res.json({ message: `${error.message}` });
  }
});
module.exports = orderRouter;
