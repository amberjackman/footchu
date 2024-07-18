// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
