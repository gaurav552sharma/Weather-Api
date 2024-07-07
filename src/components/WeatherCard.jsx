import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { FaSearchLocation } from 'react-icons/fa';
import { FavoriteBorder } from '@mui/icons-material'; // Import the icon for the button
import getWeatherIcon from '../utils/getWeatherIcon';
import { addFavoriteCity } from '../services/firebaseService'; // Import the service function
import { useAuth } from '../context/AuthContext';

const WeatherCard = ({ weather }) => {
  const { currentUser } = useAuth();
  const icon = getWeatherIcon(weather?.weather[0].main);
  const [hovered, setHovered] = useState(false);

  const handleAddFavorite = async () => {
    if (currentUser && weather) {
      await addFavoriteCity(currentUser.uid, weather.name);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: '0 auto',
        borderRadius: '16px',
        textAlign: 'center',
        background: 'transparent', 
        boxShadow: 'none', 
      }}
    >
      <CardContent className="gradient-background">
        {weather ? (
          <>
            <Tooltip
              title="Add to Favorite Cities"
              arrow
              placement="top"
              enterDelay={500}
              leaveDelay={200}
            >
              <IconButton
                onClick={handleAddFavorite}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  color: hovered ? '#FFD700' : 'white',
                }}
              >
                <FavoriteBorder />
              </IconButton>
            </Tooltip>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {icon}
            </Box>
            <Typography variant="h2" component="div" style={{ color: 'white' }}>
              {Math.round(weather.main.temp)}°C
            </Typography>
            <Typography variant="h4" component="div" style={{ color: 'white' }}>
              {weather.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, px: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" style={{ color: 'white' }}>Humidity</Typography>
                <Typography variant="h6" style={{ color: 'white' }}>{weather.main.humidity} %</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" style={{ color: 'white' }}>Wind Speed</Typography>
                <Typography variant="h6" style={{ color: 'white' }}>{(weather.wind.speed * 3.6).toFixed(2)} Km/h</Typography>
              </Box>
            </Box>
          </>
        ) : (
          <CardContent>
            <Box display="flex" justifyContent="center" marginBottom="25px">
              <FaSearchLocation size={64} color="#FAFFAF" />
            </Box>
            <Typography variant="h3" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
              Welcome to WeatherApp!
            </Typography>
            <Typography variant="body1" align="center">
              Start by searching for a City to see its weather forecast.
            </Typography>
          </CardContent>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
