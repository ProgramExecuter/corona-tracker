import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './Cards.module.css';
import CardComponent from './Card/Card';

const Cards = ({data: {confirmed, deaths, recovered, lastUpdate}}) => {
  // If the data is not loaded, we wait for data loading
  if(!confirmed) {
    return "Loading....";
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justifyContent="center">
      <CardComponent
          className={styles.infected}
          cardTitle="Infected"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of active cases from COVID-19."
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of recoveries from COVID-19."
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of deaths caused by COVID-19."
        />
      </Grid>
    </div>
  );
};

export default Cards;