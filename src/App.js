import React, { useEffect, useState } from "react";
import "./App.css";

import Graph from "./components/Graph/Graph";
import Footer from "./components/Footer/Footer";

// For sorting data
const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

const App = () => {
  const [countries, setCountries] = useState([]);

  const [confirmed, setConfirmed] = useState({ total: "0", today: "0" });
  const [death, setDeath] = useState({ total: "0", today: "0" });
  const [recovered, setRecovered] = useState({ total: "0", today: "0" });

  // Get all countries of the world
  useEffect(() => {
    const getCountries = async () => {
      fetch("https://disease.sh/v3/covid-19/countries/")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }));

          let sortedData = sortData(countries);

          setCountries(sortedData);
        })
        .catch((err) => console.log(err));
    };

    getCountries();
  }, []);

  // Get 'WORLDWIDE' data
  useEffect(() => {
    const url = "https://disease.sh/v3/covid-19/all";

    getData(url);
  }, []);

  // Change country and get new data
  const countryChange = (e) => {
    const selectedCountry = e.target.value;

    const url =
      selectedCountry === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

    getData(url);
  };

  //
  // For fetching data
  const getData = async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setConfirmed({ total: data.cases, today: data.todayCases });
        setDeath({ total: data.deaths, today: data.todayDeaths });
        setRecovered({ total: data.recovered, today: data.todayRecovered });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <header className="header">
        <img alt="web logo" className="header__logo" src="./header-logo.png" />
        <select className="header__select" onChange={countryChange}>
          <option key="Worldwide" value="Worldwide">
            Worldwide
          </option>
          {countries.map((country, idx) => {
            return (
              <option key={idx} value={country.value}>
                {country.name}
              </option>
            );
          })}
        </select>
      </header>

      <div className="databox">
        <div className="databox__confirmed databox__child">
          <span className="main_count">
            {confirmed.total} <br /> Cases
          </span>
          <span className="secondary_count">+ {confirmed.today}</span>
        </div>
        <div className="databox__death databox__child">
          <span className="main_count">
            {death.total} <br /> Deaths
          </span>
          <span className="secondary_count">+ {death.today}</span>
        </div>
        <div className="databox__recovered databox__child">
          <span className="main_count">
            {recovered.total} <br /> Recovered
          </span>
          <span className="secondary_count">+ {recovered.today}</span>
        </div>
      </div>

      <Graph />
      <Footer />
    </>
  );
};

export default App;
