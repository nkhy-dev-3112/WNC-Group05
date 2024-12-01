import React from "react";
import ReactDOM from "react-dom/client"; // Import từ 'react-dom/client'
import App from "./App";

// Khởi tạo root và render ứng dụng
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
); // Đảm bảo 'root' có kiểu HTMLElement
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
