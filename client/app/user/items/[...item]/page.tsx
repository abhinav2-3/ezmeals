"use client";
import Card, { CardProps } from "@/components/Card";
import { fetchMenu } from "@/lib/features/menuSlice";
import { AppDispatch, RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Items = () => {
  const [shopId, setShopId] = useState<null | string>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { menu } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setShopId(id);
  }, []);

  useEffect(() => {
    dispatch(fetchMenu(shopId));
  }, [dispatch, shopId]);
  return (
    <div className="flex px-16 py-8 gap-8 w-full justify-center items-center flex-wrap">
      {menu?.map((m: CardProps, i) => {
        return (
          <Card
            key={i}
            _id={m._id}
            name={m.name}
            type={m.type}
            imageUrl={m.imageUrl}
            quantity={m.quantity}
            sizeOptions={m?.sizeOptions}
          />
        );
      })}
    </div>
  );
};

export default Items;
