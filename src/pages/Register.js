import React, { useState } from 'react';
import { Box, TextField, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { createAPIEndpoint, ENDPOINT } from '../api'; // Import API utility

export default function Register() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [serverError, setServerError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setServerError(''); // Reset server error on input change
  };

  const validate = () => {
    let temp = {};
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
  
    temp.email = values.email ? '' : 'Email is required';
    temp.password = values.password
      ? passwordRegex.test(values.password)
        ? ''
        : 'Password must be 6-12 characters, include upper & lowercase letters, a number, and a special character'
      : 'Password is required';
  
    temp.confirmPassword = values.confirmPassword
      ? values.confirmPassword === values.password
        ? ''
        : 'Passwords do not match'
      : 'Re-enter password is required';
  
    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINT.RegisteredUsers)
        .post({ email: values.email, password: values.password })
        .then((res) => {
          console.log('Registration successful:', res.data);
          alert('Registration successful!');
        })
        .catch((err) => {
          console.error('Registration error:', err);
          setServerError('Registration failed. Try again.');
        });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        '& .MuiTextField-root': { margin: '8px 0', width: '90%' },
      }}
    >
      <Card sx={{ width: 400, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1), 0px 7px 20px rgba(0, 0, 0, 0.1)' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Register
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              value={values.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              value={values.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Re-enter Password"
              type="password"
              name="confirmPassword"
              variant="outlined"
              value={values.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            {serverError && <Typography color="error">{serverError}</Typography>}
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ width: '90%', mt: 2 }}>
              Register
            </Button>

            <div className="login-link">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
