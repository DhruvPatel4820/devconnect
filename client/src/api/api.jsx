// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/v1",

//   withCredentials: true,

//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;

import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://devconnect-frontend-qipf.onrender.com/api/v1",
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
