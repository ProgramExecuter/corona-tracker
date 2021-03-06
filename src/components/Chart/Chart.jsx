import React, {useState, useEffect} from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';
import { fetchDailyData } from '../../api';

// Register all chart components
ChartJS.register(...registerables);

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const initialDailyData = await fetchDailyData();
      
      setDailyData(initialDailyData);
    };
    
    fetchAPI();
  }, []);

  // For worldwide data, use LINECHART
  const lineChart = (
    dailyData.length
    ? (
      <Line 
        data={{
          labels: dailyData.map( ({date}) => date ),
          datasets: [{
            data: dailyData.map( ({confirmed}) => confirmed),
            label: 'Infected',
            borderColor: "#3333ff",
            backgroundColor: "rgba(8, 8, 255, 0.5)",
            fill: true, 
          }, {
            data: dailyData.map( ({deaths}) => deaths),
            label: 'Deaths',
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true, 
          }, {
            data: dailyData.map( ({recovered}) => recovered),
            label: 'Recovered',
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true, 
          }]
        }}
      />)  :  null);
  
  // For country-specific data use BARCHART
  const barChart = (
    confirmed
    ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: "People",
            backgroundColor: [
              "rgba(8, 8, 255, 0.5)", 
              "rgba(0, 255, 0, 0.5)", 
              "rgba(255, 0, 0, 0.5)"],
            data: [confirmed.value, recovered.value, deaths.value]
          }]
        }}
        option={{
          legend: {display: false},
          title: {display: true, text:`Current State in ${country}`}
        }}
      />
    ) : null);

  return (
    <div className={styles.container}>
      { country === 'global' ? lineChart : barChart }
    </div>
  );
};

export default Chart;