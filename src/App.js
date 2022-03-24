import React from "react";
import styles from "./App.module.css";

import coronaImage from "./images/corona.png";
import { fetchData } from "./api";
import { Cards, Chart, CountryPicker } from "./components";

class App extends React.Component {
  state = {
    data: {},
    country: "global",
  };

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="Corona Logo" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
