// src/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/favicon.ico" alt="" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">QUIZ</Link>
          </li>
          <li>
            <Link to="/list">LIST</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
