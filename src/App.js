import React from "react";
import "./App.css";

import DataBox from "./components/DataBox/DataBox";
import Graph from "./components/Graph/Graph";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <header className="header">
        <img className="header__logo" src="./header-logo.png" />
        <select className="header__select">
          <option value="All">All</option>
          <option value="India">India</option>
          <option value="New Zealand">New Zealand</option>
        </select>
      </header>
      <DataBox />
      <Graph />
      <Footer />
    </>
  );
};

export default App;
