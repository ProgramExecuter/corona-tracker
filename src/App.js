import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import DataBox from "./components/DataBox/DataBox";
import Graph from "./components/Graph/Graph";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <Header />
      <DataBox />
      <Graph />
      <Footer />
    </>
  );
};

export default App;
