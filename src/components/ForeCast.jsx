import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import getWeatherIcon from '../utils/getWeatherIcon';
import TemperatureChart from './TemperatureChart';

const Forecast = ({ forecast }) => {
  const getUniqueDates = (forecast) => {
    const uniqueDates = [];
    const dateSet = new Set();

    // Iterate through forecast and add unique dates to uniqueDates array
    forecast.forEach((day) => {
      const date = new Date(day.dt_txt).toLocaleDateString();
      if (!dateSet.has(date) && uniqueDates.length < 7) {
        dateSet.add(date);
        uniqueDates.push(day);
      }
    });

    return uniqueDates;
  };

  // Get unique days for the next 7 days from forecast
  const uniqueForecast = getUniqueDates(forecast);

  return (
    <Grid container spacing={2} style={{ marginTop: '20px' }}>
      {uniqueForecast.map((day, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
          <Card className='forecast-card' >
            <CardContent className='forecast-cardcontent'>
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  {getWeatherIcon(day.weather[0].main)} {/* Example usage */}
                </Grid>
                
                <Grid item>
                  <Typography variant="h6" style={{fontWeight: 'bold', color: '#333' }}>
                    <span style={{ fontWeight: 'bold' }}>{day.main.temp} °C</span> 
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" style={{fontWeight: 'bold', color: '#333',textAlign:'center' }}>
                    <span style={{ fontWeight: 'bold' }}>{day.weather[0].description}</span> 
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" style={{ color: '#333' }}>{new Date(day.dt_txt).toLocaleDateString()}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <TemperatureChart forecast={uniqueForecast} />
      </Grid>
    </Grid>
  );
};

export default Forecast;
