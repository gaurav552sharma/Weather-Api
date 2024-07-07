import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Alert, Box, Card, CardContent, Link as MuiLink } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { db } from '../firebase/firebase'; 
import { doc, getDoc, setDoc } from 'firebase/firestore'; 

const RootContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
});

const FormCard = styled(Card)({
});

const FormBox = styled(Box)({
  width: '100%',
  marginTop: '8px',
});

const SubmitButton = styled(Button)({
  marginTop: '24px',
});

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, isLoggedIn, currentUser } = useAuth(); // Access currentUser from AuthContext
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const createUserDoc = async () => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            email: currentUser.email,
            favoriteCities: []
          });
        }
      }
    };

    createUserDoc();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError('Failed to log in: ' + error.message);
    }
  };

  return (
    <RootContainer>
      <FormCard className='form-card' >
        <CardContent>
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <FormBox component="form" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Log In
            </SubmitButton>
          </FormBox>
          <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
            Don't have an account?{' '}
            <MuiLink component={RouterLink} to="/register">
              Register here
            </MuiLink>
          </Typography>
        </CardContent>
      </FormCard>
    </RootContainer>
  );
};

export default Login;
