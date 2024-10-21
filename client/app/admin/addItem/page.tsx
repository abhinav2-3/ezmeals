"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { ADDITEM } from "@/lib/APIsData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSession, useSession } from "next-auth/react";

type FormData = {
  name: string;
  imageUrl: string | File | null;
  type: "drink" | "meal";
  size: string;
  quantity: number;
  price: number;
  extraCost: number;
};

const Page = () => {
  const session = useSession();
  console.log(session.data);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    imageUrl: "",
    type: "meal",
    size: "",
    quantity: 1,
    price: 0,
    extraCost: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageUrl: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // try {
    //   console.log(formData);
    //   setLoading(true);
    //   // const response = await axios.post(ADDITEM, { formData });
    //   // console.log(response.data);
    //   toast({
    //     title: "Item added successfully!",
    //     description: "The new item is now listed.",
    //   });
    // } catch (error) {
    //   console.log(error);
    //   toast({ title: "Error while adding" });
    //   setLoading(false);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <section className="w-full h-[90vh] grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 bg-white shadow-lg rounded-md w-full max-w-md border"
      >
        <h1 className="font-bold text-black text-lg text-center">
          Add Food Items
        </h1>
        <div>
          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter item name"
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Image (URL or File)</Label>
          <div className="flex gap-3 items-center mt-2">
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={
                typeof formData.imageUrl === "string" ? formData.imageUrl : ""
              }
              onChange={handleInputChange}
              placeholder="Enter image URL"
              className="flex-1"
            />
            <span>or</span>
            <Input type="file" onChange={handleFileChange} className="flex-1" />
          </div>
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                type: value as "meal" | "drink",
              }))
            }
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meal">Meal</SelectItem>
              <SelectItem value="drink">Drink</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="size">Size</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                size: value,
              }))
            }
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* {formData?.size !== "small" && formData?.size !== "" && (
          <div>
            <Label htmlFor="size">Extra Price of Size</Label>
            <Input
              id="extraCost"
              name="extraCost"
              type="number"
              value={formData.extraCost}
              onChange={handleInputChange}
              className="mt-2"
              required
            />
          </div>
        )} */}

        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
            min={1}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Price (*per small item)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-2"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          Add Item
        </Button>
      </form>
    </section>
  );
};

export default Page;
