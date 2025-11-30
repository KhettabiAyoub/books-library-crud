import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api" });

export const getBooks = () => api.get("/books").then((r) => r.data);
export const getBook = (id) => api.get(`/books/${id}`).then((r) => r.data);
export const searchBooks = (q) =>
  api.get("/books/search", { params: { q } }).then((r) => r.data);
export const createBook = (data) =>
  api.post("/books", data).then((r) => r.data);
export const updateBook = (id, data) =>
  api.put(`/books/${id}`, data).then((r) => r.data);
export const deleteBook = (id) => api.delete(`/books/${id}`);
