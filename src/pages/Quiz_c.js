import React, { useEffect, useState } from 'react';
import { BASE_URL, createAPIEndpoint, ENDPOINT } from '../api';
import { Card, CardContent, Typography, List, ListItemButton, Box, LinearProgress, CardMedia } from '@mui/material';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';



export default function Quiz_c() {
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const {context,setContext} = useStateContext();
  const navigate = useNavigate();
  let timerId = null;
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  const updateAnswer = (qnId, optionIdx) => {
    const temp = [...context.selectedOptions];
  
    temp.push({
      qnId,
      selected: optionIdx,
    });

    setContext({ selectedOptions: temp });
    if (qnIndex < qns.length - 1) {
      setQnIndex(qnIndex + 1);
    } else {
      setContext({ selectedOptions: temp, timeTaken: timeTaken });
      navigate('/quiz_cresults');
    }
  };
  


  useEffect(() => {
    timerId = setInterval(() => {
      setTimeTaken((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

 

  useEffect(() => {
    setContext({ selectedOptions: [], timeTaken: 0 });

    createAPIEndpoint(ENDPOINT.Quiz_c)
      .fetch()
      .then((res) => {
        console.log("API Response:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setQns(res.data);
        }
      })
      .catch((err) => console.log(err));

    return () => clearInterval(timerId);
  }, []);


 

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      {qns.length > 0 && qns[qnIndex] ? (
        <Card sx={{ maxWidth: 640, width: '100%', p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              Question {qnIndex + 1} of {qns.length}
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 1, color: 'gray' }}>
              Time: {formatTime(timeTaken)}
            </Typography>

            <Box sx={{ mt: 2, mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={((qnIndex + 1) / qns.length) * 100}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>

            {qns[qnIndex].imageName && (
  <Box 
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      my: 2,
    }}
  >
    <Card 
      sx={{
        maxWidth: 400,
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        image={`${BASE_URL}images/${qns[qnIndex].imageName}?t=${new Date().getTime()}`}
        alt="Question Image"
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
      />
    </Card>
  </Box>
)}


          </CardContent>

          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              {qns[qnIndex].qnInWords}
            </Typography>
            <List>
              {Array.isArray(qns[qnIndex].option) && qns[qnIndex].option.length > 0 ? (
                qns[qnIndex].option.map((item, idx) => (
                  <ListItemButton key={idx} onClick={()=>updateAnswer(qns[qnIndex].qnId,idx)} sx={{ borderRadius: 2, mb: 1, bgcolor: '#f5f5f5' }}>
                    <Typography>
                      <b>{String.fromCharCode(65 + idx)}.</b> {item}
                    </Typography>
                  </ListItemButton>
                ))
              ) : (
                <Typography color="error">No options available</Typography>
              )}
            </List>
          </CardContent>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}
