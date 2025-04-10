import axios from "axios";

const api = axios.create({
  baseURL: "https://minhas-vendas-nodejs-production.up.railway.app",
  timeout: 30000,
});

// const api = axios.create({
//   baseURL: "http://localhost:3000",
// });

export default api;
