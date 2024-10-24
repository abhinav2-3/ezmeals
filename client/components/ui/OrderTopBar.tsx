import React from "react";

const OrderTopBar = () => {
  return (
    <div className="border mt-4 border-black bg-white font-semibold  flex justify-between rounded px-9 py-3">
      <span>UserId</span>
      <span>Item</span>
      <span>Type</span>
      <span>Quantity</span>
      <span>Amount</span>
      <span>Date</span>
    </div>
  );
};

export default OrderTopBar;
