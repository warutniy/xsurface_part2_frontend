import axios from "axios";

const SERVER = process.env.REACT_APP_BACKEND_URL;

export const getProduct = async () => await axios.get(`${SERVER}/product/get_product`);
export const createProduct = async (body) => await axios.post(`${SERVER}/product/create_product`, body, { headers: { 'Content-Type': 'multipart/form-data' } });
