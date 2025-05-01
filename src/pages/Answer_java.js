import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardMedia,
  List,
  ListItem,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { BASE_URL } from '../api';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { red, green, blueGrey } from '@mui/material/colors';

export default function Answer_java({ qnAnswers }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const markCorrectOrNot = (qna, idx) => {
    if ([qna.answer, qna.selected].includes(idx)) {
      return {
        sx: {
          color: qna.answer === idx ? green[600] : red[500],
          fontWeight: 'bold'
        }
      };
    }
  };

  return (
    <Box sx={{ mt: 5, width: '100%', maxWidth: 700, mx: 'auto', p: 2 }}>
      {qnAnswers.map((item, j) => (
        <Accordion
          key={j}
          expanded={expanded === j}
          onChange={handleChange(j)}
          sx={{
            borderRadius: 2,
            mb: 2,
            boxShadow: 3,
            transition: '0.3s',
            '&:hover': { boxShadow: 6 }
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandCircleDownIcon
                sx={{ color: item.answer === item.selected ? green[500] : red[500] }}
              />
            }
            sx={{
              backgroundColor: blueGrey[50],
              borderRadius: '8px',
              py: 1,
              px: 2
            }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              {item.qnInWords}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'white', borderRadius: '8px', p: 2 }}>
            {item.imageName && (
              <CardMedia
                component="img"
                image={`${BASE_URL}images/${item.imageName}`}
                sx={{
                  display: 'block',
                  maxWidth: '100%',
                  borderRadius: 2,
                  mx: 'auto',
                  my: 2
                }}
              />
            )}
            <List>
              {item.options.map((x, i) => (
                <ListItem key={i} sx={{ py: 0.5 }}>
                  <Typography {...markCorrectOrNot(item, i)}>
                    <b>{String.fromCharCode(65 + i)}. </b>
                    {x}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
