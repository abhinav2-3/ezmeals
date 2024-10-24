"use client";

import OrderCard from "@/components/ui/OrderCard";
import OrderTopBar from "@/components/ui/OrderTopBar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export interface DataType {
  shopId: string;
  name: string;
  type: string;
  quantity: number;
  amount: number;
  orderedDate: string;
}

const Order = () => {
  const path = usePathname();
  const id = path.split("/")[3];
  const [data, setData] = useState<Array<DataType>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/admin/getShopOrders/${id}`
        );

        if (response.status === 200) {
          console.log(response.data);
          setData(response?.data?.data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        } else {
          console.error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    getOrders();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-16 py-4 h-[90vh] ">
      <div className="bg-red-300/20 h-full px-8 py-4 overflow-auto">
        <h1 className="text-black font-bold text-2xl">Order History</h1>
        <OrderTopBar />
        <div className="mt-8">
          {data?.map((d, i) => {
            return <OrderCard key={i} data={d} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Order;
