import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src="./header-logo.png" />
      <select className="header__select">
        <option value="All">All</option>
        <option value="India">India</option>
      </select>
    </header>
  );
};

export default Header;
