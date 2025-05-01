import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import { BASE_URL, ENDPOINT } from "../api";
import useStateContext from "../hooks/useStateContext"; // Import context

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const { setContext } = useStateContext(); // Use context to update SubjectId
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}api/${ENDPOINT.Subjects}`)
      .then((response) => {
        console.log("Subjects Data:", response.data);
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);

  // Function to handle subject selection
  const handleSubjectClick = (subject) => {
    setContext({ SubjectId: subject.subjectId }); // Update SubjectId in context

    // Navigate based on the SubjectId
    if (subject.subjectId === 1) {
      navigate("/quiz"); // Navigate to Quiz component for SubjectId 1
    } else if (subject.subjectId === 3) {
      navigate("/quiz_c"); // Navigate to Quiz_c component for SubjectId 3
    } else {
    navigate("/quiz_java"); // Default navigation
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      {/* Header Section */}
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
        Select a Subject
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "#666" }}>
        Click on a subject to start your quiz!
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {subjects.map((subject) => (
          <Grid item key={subject.subjectId} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                maxWidth: 345,
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                },
                borderRadius: 3,
                overflow: "hidden",
              }}
              onClick={() => handleSubjectClick(subject)} // Handle click event
            >
              {subject.subImageName && (
                <CardMedia
                  component="img"
                  height="200"
                  image={subject.subImageName}
                  alt={subject.subjectName}
                />
              )}
              <CardContent sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                  {subject.subjectName}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Click to start quiz
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
