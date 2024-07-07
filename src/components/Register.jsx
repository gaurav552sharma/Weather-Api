import React, { useRef, useState,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Alert, Box, Card, CardContent, Link as MuiLink } from '@mui/material';
import { useNavigate,Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';

const RootContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
});

const FormCard = styled(Card)({
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
});

const FormBox = styled(Box)({
  width: '100%',
  marginTop: '8px',
});

const SubmitButton = styled(Button)({
  marginTop: '24px',
});

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { register,isLoggedIn } = useAuth();
  const [error, setError] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await register(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    }
  };

 
  return (
    <RootContainer>
      <FormCard className='form-card' >
        <CardContent>
          <Typography component="h1" variant="h5" align="center">
            Register
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
              label="New Password"
              type="password"
              id="password"
              autoComplete="new-password"
              inputRef={passwordRef}
            />
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Register
            </SubmitButton>
          </FormBox>
          <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
            Already have an account?{' '}
            <MuiLink component={RouterLink} to="/login">
              Log In here
            </MuiLink>
          </Typography>
        </CardContent>
      </FormCard>
    </RootContainer>
  );
};

export default Register;
