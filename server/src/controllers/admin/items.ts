import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const add_Item = async (req: Request, res: Response): Promise<any> => {
  const { formData } = req.body;

  if (!formData) {
    return res
      .status(400)
      .json({ status: false, message: "Please provide valid details" });
  }

  try {
    const amount: number = Number(formData.price) * Number(formData.quantity);
    await prisma.item.create({
      data: {
        name: formData.name,
        imageUrl: formData.imageUrl,
        price: amount,
        quantity: Number(formData.quantity),
        size: formData.size,
        type: formData.type,
        shopId: formData.shopId,
      },
    });
    return res.status(201).json({ status: true, message: "Item Added" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
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
    const menu = await prisma.item.findMany({
      where: {
        id: Number(shopId),
      },
    });
    console.log(menu);
    return res.status(200).json({ success: true, menu });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
