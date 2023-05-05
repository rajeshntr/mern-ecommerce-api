import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";

export const createOrderCtrl = asyncHandler(async(req, res) => {
  //Get payload
  const { orderItems, shippingAddress, totalPrice } = req.body;
  console.log(orderItems);
  console.log(shippingAddress);
  console.log(totalPrice);
  //Find user
  const user = await User.findById(req.userAuthId);

  //Check if order is not empty  
  if (orderItems?.length <= 0) {
    throw new Error("No order item");
  }
  
  //Place / Create order
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice
  });
  console.log(order);

  //push order into user
  user.orders.push(order?._id);
  await user.save();

  //update product qty
  const products = await Product.find({ _id: { $in: orderItems } });
  console.log(products);

  orderItems?.map(async (order) => {
    const product = products?.find((product) => {
      return product?._id.toString() === order?._id.toString();
    });

    if (product) {
      product.totalSold +=  order.qty;
    }
    await product.save();
  });

  //make payment (stripe)

  //Payment webhook
  
  //Update user order

  // send responce
  res.json({
    status:'success',
    message: 'Order created succesfullu',
    order,
    user
  });
});


