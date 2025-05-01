import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import useStateContext from '../hooks/useStateContext';
import { createAPIEndpoint, ENDPOINT } from '../api';

export default function MyResults() {
    const { context } = useStateContext();
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (context.participantId) {
            createAPIEndpoint(`${ENDPOINT.ParticipantResult_c}/participant`)
                .fetchById(context.participantId)
                .then(res => {
                    setResults(res.data);
                })
                .catch(err => console.error("Failed to fetch results:", err));
        }
    }, [context.participantId]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                My Quiz Results
            </Typography>
            <Grid container spacing={2}>
                {results.map(result => (
                    <Grid item xs={12} sm={6} md={4} key={result.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    Subject: {result.subjectId || "N/A"}
                                </Typography>
                                <Typography>Score: {result.score}</Typography>
                                <Typography>Date: {new Date(result.attemptedAt).toLocaleString()}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
