"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "./ui/button";

export interface CardProps {
  imageUrl: string;
  name: string;
  type: string;
  size: string;
  quantity: number;
  price: number;
}

const Card: React.FC<CardProps> = ({ imageUrl, name, quantity, price }) => {
  const [qty, setQty] = useState<number>(1);
  const [amount, setprice] = useState<number>(price);
  const [itemsize, setItemSize] = useState<string>("small");
  const [sizeCost, setSizeCost] = useState<number>(0);

  const quantityHandler = (value: string) => {
    const selectedQty = parseInt(value);
    setQty(selectedQty);
    console.log(qty, selectedQty);
  };

  useEffect(() => {
    if (itemsize === "medium") setSizeCost(45);
    else if (itemsize === "large") setSizeCost(70);
    else setSizeCost(0);
    setprice(price * qty + sizeCost);
  }, [qty, price, sizeCost, itemsize]);

  return (
    <div className="w-[28%] bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-48 object-contain border-b py-2"
        src={imageUrl}
        alt={name}
        width={100}
        height={100}
      />
      <div className="p-6 flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <div className="flex gap-4">
          <Select
            defaultValue="small"
            onValueChange={(value: string) => setItemSize(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {["Small", "Medium", "Large"].map((size) => (
                  <SelectItem key={size} value={size.toLowerCase()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select defaultValue={"1"} onValueChange={quantityHandler}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select a Quantity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: quantity }, (_, i) => i + 1).map(
                  (num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="text-gray-800 font-bold text-lg">Price: ₹{amount}</p>
        <div className="flex justify-around">
          <Button>Buy Now</Button>
          <Button variant={"secondary"} className="border">
            Add in Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
