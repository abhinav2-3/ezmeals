import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateShopId } from "../utils/helpers";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<any> => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res
      .status(404)
      .json({ success: false, message: "Please Provide Credentials !!" });
  }
  try {
    const isUserExist = await prisma.user.findFirst({
      where: { email: email },
    });
    const userId = isUserExist?.userId || generateShopId();

    const user = await prisma.user.upsert({
      where: {
        email: email as string,
      },
      create: {
        email,
        name,
        userId,
      },
      update: {
        email,
        name,
        userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        userId: true,
      },
    });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error while login", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
