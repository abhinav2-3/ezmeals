"use client";
import React, { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "./ui/button";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";

export interface CardProps {
  imageUrl: string;
  name: string;
  type: string;
  _id: string;
  quantity: number;
  sizeOptions: {
    small: number;
    medium: number;
    large: number;
  };
}

const Card: React.FC<CardProps> = ({
  _id,
  imageUrl,
  name,
  quantity,
  sizeOptions,
}) => {
  const { small, medium, large } = sizeOptions;
  const [qty, setQty] = useState<number>(1);
  const dispatch = useDispatch();
  const [itemsize, setItemSize] = useState<"small" | "medium" | "large">(
    "small"
  );

  // Use `useMemo` to optimize the price calculation.
  const price = useMemo(() => {
    const sizePrice =
      itemsize === "small" ? small : itemsize === "medium" ? medium : large;
    return sizePrice * qty;
  }, [qty, itemsize, small, medium, large]);

  return (
    <div className="w-[28%] bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <figure className="w-full h-[28vh]">
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          loading="lazy"
          className="object-contain w-full h-full"
        />
      </figure>
      <div className="p-6 flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <div className="flex gap-4">
          <Select
            defaultValue="small"
            onValueChange={(value: string) =>
              setItemSize(value as "small" | "medium" | "large")
            }
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
          <Select
            defaultValue={"1"}
            onValueChange={(value) => setQty(parseInt(value))}
          >
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
        <p className="text-gray-800 font-bold text-lg">Price: ₹{price}</p>
        <div className="flex justify-around">
          <Button>Buy Now</Button>
          <Button
            variant={"secondary"}
            className="border"
            onClick={() =>
              dispatch(
                addToCart({
                  _id,
                  imageUrl,
                  name,
                  itemsize,
                  qty,
                  price,
                  maxQty: quantity,
                })
              )
            }
          >
            Add in Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
