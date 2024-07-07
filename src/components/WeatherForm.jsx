import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const WeatherForm = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: 'flex',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center', // Ensure form items are centered horizontally
        gap: 2,
        minHeight: '64px', // Set a minimum height to match toolbar height
      }}
    >
      <TextField
        label="CityName"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        fullWidth={true} // Ensure text field takes full width
        sx={{ backgroundColor: 'white', borderRadius: '4px' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default WeatherForm;
