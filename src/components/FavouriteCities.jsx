import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { getFavoriteCities } from '../services/firebaseService'; // Import the service function to retrieve favorite cities
import { useAuth } from '../context/AuthContext';

const FavoriteCities = ({ onSearch, handleFavouriteCities }) => {
  const { currentUser } = useAuth();
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state added

  const gradientBackground = {
    background: 'linear-gradient(to bottom, #87CEEB, #6A5ACD)', // Example gradient from light blue to purple
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
    maxWidth: 345,
    margin: '20px auto',
    position: 'relative', // Add relative positioning if needed
  };

  useEffect(() => {
    const fetchCities = async () => {
      if (currentUser) {
        const userCities = await getFavoriteCities(currentUser.uid);
        setCities(userCities);
        setIsLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCities();
  }, [currentUser]);

  const handleCityClick = async (cityName) => {
    onSearch(cityName);
    handleFavouriteCities(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
      <Typography variant="h4" component="div" sx={{ marginBottom: '20px', color: 'lightgrey' }}>
        List of Your Favorite Cities
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', maxWidth: '800px' }}>
        {isLoading ? (
          <CircularProgress color="secondary" /> // Show loading indicator while fetching data
        ) : cities.length === 0 ? (
          <Typography variant="h5" component="div">
            No City Added
          </Typography>
        ) : (
          cities.map((city, index) => (
            <Card key={index} sx={gradientBackground} onClick={() => handleCityClick(city)}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: 'white', fontFamily: 'Roboto', fontWeight: '300' }}>
                  {city}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default FavoriteCities;
