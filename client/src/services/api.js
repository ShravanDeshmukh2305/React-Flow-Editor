import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

export const fetchProducts = () => API.get("/products?limit=30");
export const fetchProduct = (id) => API.get(`/products/${id}`);
