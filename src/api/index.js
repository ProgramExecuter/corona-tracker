import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async () => {
  try {
    // Get only required data
    const {
      data: { confirmed, deaths, recovered, lastUpdate },
    } = await axios.get(url);

    const modifiedData = { confirmed, deaths, recovered, lastUpdate };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    const fetchedCountries = countries.map((country) => country.name);

    return fetchedCountries;
  } catch (error) {
    console.log(error);
  }
};
