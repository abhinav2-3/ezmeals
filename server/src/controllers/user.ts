import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateShopId } from "../utils/helpers";
import { User } from "../models/user";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<any> => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res
      .status(404)
      .json({ success: false, message: "Please Provide Credentials !!" });
  }
  try {
    const isUserExist = await User.findOne({ email });
    const userId = isUserExist?.userId || generateShopId();
    let user;
    if (!isUserExist) {
      user = await User.create({ email, name, userId });
    }

    user = await User.findOneAndUpdate({ email }, { name, userId, email });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error while login", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.params;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Params !!" });
  }
  try {
    const user = await User.findOne({
      email,
    });
    console.log(user?.email);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error while login", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
