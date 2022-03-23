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

    console.log("Daily", modifiedData);
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
