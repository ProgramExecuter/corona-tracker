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
