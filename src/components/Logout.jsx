import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material'; 
import styled from '@emotion/styled';

const RedButton = styled(Button)({
  backgroundColor: 'red',
  color: 'white',
  '&:hover': {
    backgroundColor: '#cc0000', 
  },
  fontFamily: 'Roboto', 
  fontWeight: '300',
});

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out: ' + error.message);
    }
  };

  return (
    <RedButton variant="contained" onClick={handleLogout}>
      Log Out
    </RedButton>
  );
};

export default Logout;
