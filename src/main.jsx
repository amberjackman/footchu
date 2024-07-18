// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Analytics />
  </>
);
