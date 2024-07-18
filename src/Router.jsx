import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import List from "./List";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
};

export default AppRouter;
