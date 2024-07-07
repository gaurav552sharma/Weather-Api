import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Grid, CircularProgress, Typography, useMediaQuery,Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WeatherForm from '../components/WeatherForm';
import { getWeather, getForecast } from '../services/DataFetching';
import WeatherCard from '../components/WeatherCard';
import ForeCast from '../components/ForeCast'; // Corrected import name
import FavouriteCities from '../components/FavouriteCities';
import DropdownMenu from '../components/DropdownMenu';
import Logout from '../components/Logout';
import { IoMenu } from "react-icons/io5";

const Home = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favouriteCities, setFavouriteCities] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = async (city) => {
    try {
      setIsLoading(true);
      setError('');
      setFavouriteCities(false);
      const weatherData = await getWeather(city);
      const forecastData = await getForecast(city);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('City not found. Enter a valid city name.');
      setWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavouriteCities = (value) => {
    setFavouriteCities(value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='home-div' >
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar className='tool-bar'>
          <WeatherForm onSearch={handleSearch} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMediumScreen ? (
              <Button variant="contained" onClick={toggleMenu} sx={{ backgroundColor: '#8AB6B9', color: 'white',padding:'16%' }}>
                 <IoMenu/>
              </Button>
            ) : (
              <>
                <Button variant="contained" onClick={() => handleFavouriteCities(!favouriteCities)} sx={{ backgroundColor: '#8AB6B9', color: 'white', marginRight: '10px' }}>
                  {favouriteCities ? 'Hide Favourite Cities' : 'Show Favourite Cities'}
                </Button>
                <Logout />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Grid >
        {favouriteCities ? (
          <FavouriteCities onSearch={handleSearch} handleFavouriteCities={handleFavouriteCities} />
        ) : (
          <Box>
            {isLoading ? (
              <Grid container justifyContent="center" alignItems="flex-start">
                <CircularProgress color="secondary" />
              </Grid>
            ) : (
              <>
                {error ? (
                  <Typography variant="h6" color="error">{error}</Typography>
                ) : (
                  <>
                    <WeatherCard weather={weather} />
                    {forecast && <ForeCast forecast={forecast} />} 
                  </>
                )}
              </>
            )}
          </Box>
        )}
      </Grid>

      {isMediumScreen && (
        <DropdownMenu isOpen={menuOpen} onClose={toggleMenu} handleFavouriteCities={handleFavouriteCities} favouriteCities={favouriteCities} />
      )}
    </div>
  );
};

export default Home;
