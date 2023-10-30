import axios from "axios";

const SERVER = process.env.REACT_APP_BACKEND_URL;

export const createProduct = async (body) => await axios.post(`${SERVER}/product/create_product`, body, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getProduct = async () => await axios.get(`${SERVER}/product/get_product`);
export const getAutoComplete = async (body) => await axios.get(`${SERVER}/product/suggestion`, { params: { term: body } });
export const getSearchProduct = async (body) => await axios.get(`${SERVER}/product/search`, { params: { term: body } });
