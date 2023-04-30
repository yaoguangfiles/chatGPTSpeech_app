import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://localhost:7198/api",
  headers: {
    "Content-type": "application/json"
  }
});
