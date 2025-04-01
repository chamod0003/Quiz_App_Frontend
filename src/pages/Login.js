import React,{useEffect} from 'react';
import { Box, TextField, Card, CardContent, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { createAPIEndpoint, ENDPOINT } from '../api';
import useStateContext from '../hooks/useStateContext';

export default function Login() {
  const getFreshModel = () => ({
    email: '',
    password: '',
  });

  const {context, setContext,resetContext} = useStateContext();

  const Navigate = useNavigate();

  const {
    values,
    errors,
    handleInputChange,
  } = useForm(getFreshModel);

  const validate = () => {
    let temp = {};
    temp.email = values.email ? "" : "Email is required";
    temp.password = values.password ? "" : "Password is required";
    return Object.values(temp).every((x) => x === "");
  };
/*
  const login = (e) => {
    e.preventDefault();
    if (!validate()) return;
    createAPIEndpoint(ENDPOINT.Participants)
    .post(values)
    .then(res => {
      setContext({ participantId: res.data.participantId }); // Fix res
      console.log(context);
      Navigate('/quiz');
    })
    .catch(err => console.log(err));
  
  };*/

  /*
  const login = (e) => {
  e.preventDefault();
  if (!validate()) return;

  createAPIEndpoint(ENDPOINT.RegisteredUsers) // Fetch the registered users
    .fetch()
    .then((res) => {
      const user = res.data.find((user) => user.email === values.email);
      if (user) {
        if (user.password === values.password) {
          setContext({ participantId: user.id });
          Navigate('/quiz');
        } else {
          alert('Incorrect password');
        }
      } else {
        alert('User not found');
      }
    })
    .catch((err) => console.log(err));
};*/

useEffect(() => {
  resetContext();

},[])


const login = (e) => {
  e.preventDefault();
  if (!validate()) return;

  createAPIEndpoint(ENDPOINT.RegisteredUsers)
    .fetch()
    .then((res) => {
      const user = res.data.find((user) => user.email === values.email);

      if (user) {
        if (user.password === values.password) {
          const participantData = {
            participantId: user.id, // Temporary ID before API response
            email: user.email,
            timeTaken: 0,
            score: 0
          };

          setContext(participantData);
          localStorage.setItem('context', JSON.stringify(participantData));

          // Store the participant details in both endpoints
          Promise.all([
            createAPIEndpoint(ENDPOINT.Participants).post(participantData),
            createAPIEndpoint(ENDPOINT.Participant_c).post(participantData)
          ])
            .then(([res1, res2]) => {
              // Ensure correct participantId from API response
              const updatedParticipantData = {
                ...participantData,
                participantId: res1.data.participantId // Assuming both return the same ID
              };

              setContext(updatedParticipantData);
              localStorage.setItem('context', JSON.stringify(updatedParticipantData));

              console.log('Participant data stored successfully:', updatedParticipantData);
              Navigate('/home'); // Navigate after both API calls succeed
            })
            .catch((err) => console.error('Error saving participant data:', err));

        } else {
          alert('Incorrect password');
        }
      } else {
        alert('User not found');
      }
    })
    .catch((err) => console.error('Login Error:', err));
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
            Quiz App
          </Typography>
          <form noValidate onSubmit={login}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              variant="outlined"
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
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ width: '90%', mt: 2 }}>
              Login
            </Button>

            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
