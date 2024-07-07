import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { currentUser } = useAuth();

  return (
    <Container sx={{width:'100%'}}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Container>
  );
};

export default App;
