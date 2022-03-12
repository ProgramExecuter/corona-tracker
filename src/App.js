import React, { useEffect, useState } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
  options: {
    maintainAspectRatio: true,
  },
};

///
// For sorting data
///
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
  const [country, setCountry] = useState(["all"]);
  const [graphData, setGraphData] = useState({});

  const [confirmed, setConfirmed] = useState({ total: "0", today: "0" });
  const [death, setDeath] = useState({ total: "0", today: "0" });
  const [recovered, setRecovered] = useState({ total: "0", today: "0" });
  const [caseType, setCaseType] = useState("cases");

  ///
  // Get all countries of the world
  ///
  const getCountries = async () => {
    fetch("https://disease.sh/v3/covid-19/countries")
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

  ///
  // For fetching data for databoxes
  ///
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

  ///
  // Fetch historical data for graph
  ///
  const fetchHistoricalData = async (url, caseType) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGraphData(data);
      })
      .catch((err) => console.log(err));
  };

  ///
  // On first page loading
  ///
  useEffect(() => {
    // Get all countries in the world
    getCountries();

    // get data for databoxes
    let url = "https://disease.sh/v3/covid-19/all";
    getData(url);

    // get historical data for graph
    url = "https://disease.sh/v3/covid-19/historical/all";
    fetchHistoricalData(url, caseType);
  }, []);

  ///
  // Fetch historical data when changing caseType OR country
  ///
  useEffect(() => {
    const url =
      country == "all"
        ? "https://disease.sh/v3/covid-19/historical/all"
        : `https://disease.sh/v3/covid-19/historical/${country}`;

    fetchHistoricalData(url, caseType);
  }, [caseType, country]);

  ///
  // Fetch databox data when changing country
  ///
  useEffect(() => {
    // get data for databoxes
    let url =
      country == "all"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${country}`;

    getData(url);
  }, [country]);

  return (
    <>
      <header className="header">
        <img alt="web logo" className="header__logo" src="./header-logo.png" />
        <select
          className="header__select"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          <option key="all" value="all">
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
        <div
          className="databox__confirmed databox__child"
          onClick={() => {
            setCaseType("cases");
          }}
        >
          <span className="main_count">
            {confirmed.total} <br /> Cases
          </span>
          <span className="secondary_count">+ {confirmed.today}</span>
        </div>
        <div
          className="databox__death databox__child"
          onClick={() => {
            setCaseType("deaths");
          }}
        >
          <span className="main_count">
            {death.total} <br /> Deaths
          </span>
          <span className="secondary_count">+ {death.today}</span>
        </div>
        <div
          className="databox__recovered databox__child"
          onClick={() => {
            setCaseType("recovered");
          }}
        >
          <span className="main_count">
            {recovered.total} <br /> Recovered
          </span>
          <span className="secondary_count">+ {recovered.today}</span>
        </div>
      </div>

      <div className="graph">
        <Line className="graph__lineGraph" data={data} />
      </div>
    </>
  );
};

export default App;
