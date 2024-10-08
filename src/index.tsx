import React from "react";
import ReactDOM from "react-dom/client";
import "style/common/global.css";
import App from "./App";
import { Toaster } from "components/ui/toaster";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
);
