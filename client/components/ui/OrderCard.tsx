import { DataType } from "@/app/admin/orders/[...orders]/page";
import { CartDataType } from "@/lib/features/cartSlice";
import { formatDate } from "@/lib/helpers";
import React from "react";

const OrderCard = ({ data }: { data: CartDataType }) => {
  return (
    <div className="border my-4 border-gray-500 bg-white flex justify-between rounded px-6 py-3">
      <span className="text-[0.8rem] uppercase">#{data?.shopId}</span>
      <span>{data?.name}</span>
      <span>{data?.type}</span>
      <span>{data?.quantity}</span>
      <span>{data?.amount}</span>
      <span className="text-sm">{formatDate(data?.orderedDate)}</span>
    </div>
  );
};

export default OrderCard;
