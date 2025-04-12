import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../services/api";
import { FlowContext } from "./FlowEditor";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addNode } = useContext(FlowContext);

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data.products));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">📦 Product Catalog</h2>
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow hover:shadow-lg p-3 transition-all duration-200 hover:bg-yellow-50 cursor-pointer"
            onClick={() => addNode(product)}
          >
            <h4 className="font-medium text-sm text-gray-800 truncate">{product.title}</h4>
            <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;




