import React from "react";
import ProductList from "../components/ProductList";
import FlowEditor from "../components/FlowEditor";

const ProductFlow = () => {
  return (
    <div className="flex h-screen pt-20 px-6 bg-gradient-to-r from-blue-50 to-white">
      <FlowEditor>
        <ProductList />
      </FlowEditor>
    </div>
  );
};

export default ProductFlow;

