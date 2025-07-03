import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Products } from "./Products/Products";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <header className="bg-[#ff0032] text-white p-4 mb-4">
      <h1 className="text-2xl font-bold">Gousto</h1>
    </header>
    <main className="container mx-auto p-4">
      <Products />
    </main>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
