import React from "react";
import Billing from "./billing";
import Products from "./products";

const Order = () => {
  return (
    <div className="flex  items-start gap-20 justify-between flex-col md:flex-row ">
      <Products />
      <Billing />
    </div>
  );
};

export default Order;
