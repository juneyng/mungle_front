import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analyze from "./pages/Analyze";
import History from "./pages/History";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Analyze />} />
      <Route path="/history" element={<History />} />
    </Routes>
  </BrowserRouter>
);
