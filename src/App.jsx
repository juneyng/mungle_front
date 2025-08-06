import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Analyze from "./pages/Analyze";
import History from "./pages/History";
import "./App.css"; // 필요 시

const App = () => {
  return (
    <>
      <Sidebar />
      <div className="main-content">  
        <Routes>
          <Route path="/" element={<Analyze />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
