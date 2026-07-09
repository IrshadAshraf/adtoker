import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";

function App() {
  return (
    <div className="relative min-h-screen font-grot">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
