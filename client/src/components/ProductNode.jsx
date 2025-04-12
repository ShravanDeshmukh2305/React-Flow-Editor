import React from "react";
import { Handle, Position } from "reactflow";

const ProductNode = ({ data }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-200 text-center min-w-[150px]">
      <div className="text-sm font-semibold text-gray-700 mb-1">{data.title}</div>
      <div className="text-xs text-gray-500 mb-2">${data.price.toFixed(2)}</div>
      <Handle type="target" position={Position.Top} style={{ background: "#4B5563" }} />
      <Handle type="source" position={Position.Bottom} style={{ background: "#4B5563" }} />
    </div>
  );
};

export default ProductNode;
