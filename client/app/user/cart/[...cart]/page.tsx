"use client";

import { Button } from "@/components/ui/button";
import { dropCart, removeFromCart } from "@/lib/features/cartSlice";
import { RootState } from "@/lib/store";
import axios from "axios";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const amount = cart.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.qty,
    0
  );

  const orderHandler = async () => {
    try {
      setLoading(true);
      await Promise.all(
        cart.map(async (item) => {
          await axios.post("http://localhost:3001/api/admin/placeOrder", {
            name: item?.name,
            quantity: item?.qty,
            size: item?.itemsize,
            type: item?.type,
            userId: "user1001",
            amount: amount,
          });
        })
      );
      dispatch(dropCart());
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (cart?.length === 0)
    return (
      <div className="w-full h-[80vh] grid place-items-center text-4xl">
        Cart is Empty
      </div>
    );
  console.log(cart);
  return (
    <div className="px-16 py-4 h-[90vh] ">
      <div className="bg-red-300/20 h-full py-4 overflow-auto px-2">
        <div className="grid grid-cols-6 font-bold p-4 place-items-center border-b border-red-500">
          <p className="">Item</p>
          <p className="">Price</p>
          <p className="">Quantity</p>
          <p className="">Size</p>
          <p className="">SubTotal</p>
          <p className="">Remove</p>
        </div>
        <section className="py-4">
          {cart.map((item) => {
            return (
              <div
                className="grid grid-cols-6 pb-3 place-items-center "
                key={item.id}
              >
                <figure className="flex gap-4 items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 border border-black"
                  />
                  <h1>{item.name}</h1>
                </figure>
                <span>${item?.price}</span>
                <span>{item?.qty}</span>
                <span className="capitalize">{item?.itemsize}</span>
                <span>${item?.price * item?.qty}</span>
                <Button
                  variant={"destructive"}
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                >
                  <MdDelete />
                </Button>
              </div>
            );
          })}
        </section>
        <hr className="px-2 border-red-500" />
        <div className="p-8 px-20 flex justify-between">
          <aside className="flex gap-4 text-lg">
            <h1 className="font-semibold ">Totoal Price : </h1>
            <span>${amount}</span>
          </aside>
          <Button onClick={() => orderHandler()} disabled={loading}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
