import React from "react";
import "./DataBox.css";

const DataBox = () => {
  return (
    <div className="databox">
      <div className="databox__confirmed databox__child">
        <span className="main_count">
          {"133,245,113"} <br /> Cases
        </span>
        <span className="secondary_count">+ {"2,234"}</span>
      </div>
      <div className="databox__death databox__child">
        <span className="main_count">
          {"123,192"} <br /> Deaths
        </span>
        <span className="secondary_count">+ {"8"}</span>
      </div>
      <div className="databox__recovered databox__child">
        <span className="main_count">
          {"132,245,113"} <br /> Recovered
        </span>
        <span className="secondary_count">+ {"23,234"}</span>
      </div>
    </div>
  );
};

export default DataBox;
