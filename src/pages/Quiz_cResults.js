import React, { useEffect, useState } from 'react';
import useStateContext from '../hooks/useStateContext';
import { createAPIEndpoint, ENDPOINT } from '../api';
import { getFormatedTime } from '../helper';
import { Card, CardContent, Typography, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';  // Import Confetti
import Answer_c from './Answer_c';

export default function Quiz_cResults() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const ids = context.selectedOptions.map(x => x.qnId);
    createAPIEndpoint(ENDPOINT.GetAnswers_c)
      .post(ids)
      .then(res => {
        const qna = context.selectedOptions.map(x => ({
          ...x,
          ...(res.data.find(y => y.qnId === x.qnId))
        }));
        setQnAnswers(qna);
        calculateScore(qna);
      })
      .catch(err => console.log(err));
  }, []);

  const calculateScore = qna => {
    let tempScore = qna.reduce((acc, curr) => (curr.answer === curr.selected ? acc + 1 : acc), 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({ selectedOptions: [], timeTaken: 0, subjectId: 0 });  // Reset subjectId
    navigate('/quiz');
  }

  const submitScore = () => {
    // Ensure SubjectId is correctly passed from context
    const payload = {
      participantId: context.participantId,
      Score: score,
      TimeTaken: context.timeTaken,
      SubjectId: context.SubjectId  // Corrected typo and ensured it's passed
    };

    console.log("Payload:", payload);  // Debugging: Log the payload

    createAPIEndpoint(ENDPOINT.Participant_c)
      .put(context.participantId, payload)
      .then(res => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch(err => console.log("Error submitting score:", err.response?.data || err));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
      
      {/* Show Confetti if Score is 6/6 */}
      {score === 6 && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <Card sx={{ width: 400, textAlign: 'center', mb: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" color="primary">Results</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
            Score: {score} / {qnAnswers.length}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Time Taken: {getFormatedTime(context.timeTaken)}
          </Typography>

          <Button variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}>
              Submit
          </Button>
         
          <Alert
            severity="success"
            variant="string"
            sx={{
              width: '60%',
              m: 'auto',
              visibility: showAlert ? 'visible' : 'hidden'
            }}>
            Score Updated.
          </Alert>
        </CardContent>
      </Card>
      
      <Answer_c qnAnswers={qnAnswers} />
    </div>
  );
}