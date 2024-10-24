import { Schema, model, Document } from "mongoose";

// Enums matching PostgreSQL enum types
export enum MealType {
  Drink = "drink",
  Meal = "meal",
}

export enum MealSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

interface IUser extends Document {
  email: string;
  name: string;
  userId: string;
}

interface IItem extends Document {
  shopId: string;
  name: string;
  imageUrl: string;
  type: MealType;
  size: MealSize;
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  type: MealType;
  quantity: number;
  name: string;
  amount: number;
  shopId: string;
  orderedDate: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

// ITEM MODEL

const itemSchema = new Schema<IItem>({
  shopId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(MealType),
    required: true,
  },
  size: {
    type: String,
    enum: Object.values(MealSize),
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// ORDER MODEL

const orderSchema = new Schema<IOrder>({
  type: {
    type: String,
    enum: Object.values(MealType),
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  orderedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Order = model<IOrder>("Order", orderSchema);
const User = model<IUser>("User", userSchema);
const Item = model<IItem>("Item", itemSchema);

export { User, Item, Order };
