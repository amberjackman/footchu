// src/App.jsx
import React from "react";
import AppRouter from "./Router";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
};

export default App;
