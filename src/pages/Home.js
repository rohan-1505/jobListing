import React from "react";
import { Typography, Button, Container, Box, Paper, Stack } from "@mui/material"; // <-- Import layout components
import { Link } from "react-router-dom";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'; // <-- Import an icon
import WorkIcon from '@mui/icons-material/Work'; // <-- Import an icon

const Home = () => {
  return (
    // 1. Full-page wrapper to center everything
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', // Takes full screen height
        backgroundColor: '#f4f6f8' // A light grey background
      }}
    >
      <Container maxWidth="md">
        {/* 2. A "Paper" component to act as a container card */}
        <Paper 
          elevation={3} 
          sx={{ 
            padding: { xs: '2rem', md: '4rem' }, // Responsive padding
            textAlign: 'center' 
          }}
        >
          {/* 3. The main title */}
          <Typography 
            variant="h3" 
            component="h1" // Better for SEO
            gutterBottom // Adds space below
          >
            Get Hired or Hire people for free!
          </Typography>

          {/* 4. A new subtitle for more context */}
          <Typography 
            variant="h6" 
            color="text.secondary" // Softer color
            sx={{ margin: '1.5rem 0 2.5rem 0' }}
          >
            Choose your path. Are you looking for the perfect candidate or your next big opportunity?
          </Typography>

          {/* 5. A Stack to manage the buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }} // Stack vertically on small screens, row on larger
            spacing={3} // Space between buttons
            justifyContent="center"
          >
            {/* 6. Improved Button:
              - component={Link} fixes the styling
              - variant="contained" is stronger
              - size="large" is more clickable
              - startIcon adds the icon
            */}
            <Button
              component={Link}
              to="/employer/dashboard"
              variant="contained"
              size="large"
              startIcon={<BusinessCenterIcon />}
              sx={{ padding: '0.8rem 1.5rem' }} // Custom padding
            >
              Hire Talent
            </Button>
            
            <Button
              component={Link}
              to="/employee/feed"
              variant="contained" // Made both contained for equal importance
              size="large"
              startIcon={<WorkIcon />}
              sx={{ padding: '0.8rem 1.5rem' }}
            >
              Get Job Now
            </Button>
          </Stack>

        </Paper>
      </Container>
    </Box>
  );
};

export default Home;