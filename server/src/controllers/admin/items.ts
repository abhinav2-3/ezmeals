import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Item, Order } from "../../models/user";

const prisma = new PrismaClient();

export const add_Item = async (req: Request, res: Response): Promise<any> => {
  const { formData } = req.body;

  if (!formData) {
    return res
      .status(400)
      .json({ status: false, message: "Please provide valid details" });
  }

  try {
    await Item.create({
      name: formData.name,
      imageUrl: formData.imageUrl,
      quantity: Number(formData.quantity),
      size: formData.size,
      type: formData.type,
      shopId: formData.userId,
      sizeOptions: formData.sizeOptions,
    });
    return res.status(201).json({ status: true, message: "Item Added" });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const getMenu = async (req: Request, res: Response): Promise<any> => {
  const { shopId } = req.params;
  if (!shopId) {
    return res
      .status(404)
      .json({ success: false, message: "ShopId is invalid!!" });
  }
  try {
    const menu = await Item.find({ shopId });

    return res.status(200).json({ success: true, data: menu });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const placeOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { size, name, amount, quantity, userId } = req.body;

    const order = new Order({
      name,
      amount,
      // type,
      size,
      quantity,
      shopId: userId,
    });
    await order.save();
    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getShopOrders = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { shopId } = req.params;
  if (!shopId) {
    return res
      .status(404)
      .json({ success: false, message: "ShopId is invalid!!" });
  }
  try {
    const orders = await Order.find({ shopId });

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
