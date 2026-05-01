import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
  CircularProgress,
  CardActions, // <-- ADD THIS IMPORT
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url =
          query.length > 2
            ? `http://localhost:8080/posts/${query}`
            : `http://localhost:8080/allPosts`;
        
        const response = await axios.get(url);
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load job posts. Please try again later.");
      }
      setIsLoading(false);
    };

    const delayDebounceFn = setTimeout(() => {
      if (query.length === 0 || query.length > 2) {
        fetchPosts();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    
  }, [query]);

  // --- ADD THIS NEW DELETE HANDLER ---
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/post/${id}`);
      // After successful deletion, filter the post out of the local state
      // This updates the UI instantly without needing a full refresh
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
      // You could set an error state here to show a message to the user
      setError("Failed to delete post. Please try again.");
    }
  };
  // ------------------------------------

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '5%' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading...</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Typography 
          variant="h6" 
          color="error" 
          align="center" 
          sx={{ margin: "5%" }}
        >
          {error}
        </Typography>
      );
    }

    if (posts.length === 0) {
      return (
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ margin: "5%" }}
        >
          No job posts found.
        </Typography>
      );
    }

    return posts.map((p) => (
      <Grid key={p.id} item xs={12} md={6} lg={4}>
        {/*
          I've added flex properties to the Card to make sure the
          delete button aligns to the bottom, even if cards
          have different content heights.
        */}
        <Card sx={{ 
            padding: "3%", 
            overflow: "hidden", 
            width: "84%", 
            height: "100%", // Make card fill the grid item
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "space-between" // Pushes button to bottom
          }}>
          
          {/* Box to hold the main content */}
          <Box>
            <Typography
              variant="h5"
              sx={{ fontSize: "2rem", fontWeight: "600" }}
            >
              {p.profile}
            </Typography>
            <Typography sx={{ color: "#585858", marginTop: "2%" }} variant="body">
              Description: {p.desc}
            </Typography>
            <br />
            <br />
            <Typography variant="h6">
              Years of Experience: {p.exp} years
            </Typography>

            <Typography gutterBottom variant="body">Skills : </Typography>
            {p.techs && p.techs.length > 0 ? (
              p.techs.map((s, i) => (
                <Typography variant="body" gutterBottom key={i}>
                  {s} .{` `}
                </Typography>
              ))
            ) : (
              <Typography variant="body" gutterBottom>
                None specified
              </Typography>
            )}
          </Box>
          
          {/* --- ADD THIS CARD ACTIONS & BUTTON --- */}
          <CardActions sx={{ padding: 0, marginTop: "1rem" }}>
            <Button
              size="small"
              variant="contained"
              color="error" // This makes the button red
              onClick={() => handleDelete(p.id)}
            >
              Delete
            </Button>
          </CardActions>
          {/* ------------------------------------- */}

        </Card>
      </Grid>
    ));
  };

  return (
    <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Grid item xs={12} sx={12} md={12} lg={12}>
        <Button
          sx={{ margin: "1% 2%" }}
          variant="outlined"
          component={Link}
          to="/"
        >
          Home
        </Button>
        <Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search for job profiles, descriptions, or skills..."
            sx={{ width: "75%", padding: "2% auto" }}
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Grid>
      
      {renderContent()}
    </Grid>
  );
};

export default Feed;