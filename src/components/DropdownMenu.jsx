// src/components/DropdownMenu.js
import React from 'react';
import { Drawer, List, ListItem, Button } from '@mui/material';
import Logout from './Logout';

const DropdownMenu = ({ isOpen, onClose, handleFavouriteCities, favouriteCities }) => {
  const toggleFavouriteCities = () => {
    handleFavouriteCities(!favouriteCities);
    onClose(); // Close the menu
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <List>
        <ListItem button onClick={toggleFavouriteCities}>
          <Button variant="contained" sx={{ backgroundColor: '#8AB6B9', color: 'white', marginRight: '10px' }}>
            {favouriteCities ? 'Hide Favourite Cities' : 'Show Favourite Cities'}
          </Button>
        </ListItem>
        <ListItem>
          <Logout />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DropdownMenu;
