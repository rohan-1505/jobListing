import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  // --- ADD THESE IMPORTS ---
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  // -------------------------
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const initial = { profile: "", exp: 0, techs: [], desc: "" };

const Create = () => {
  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
    { name: "SpringBoot" },
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  
  // --- ADD THIS STATE TO CONTROL THE DIALOG ---
  const [open, setOpen] = useState(false);
  // ------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // --- INSTEAD OF NAVIGATING, OPEN THE DIALOG ---
        setOpen(true);
        // ---------------------------------------------
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const { profile, exp, desc } = form;

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm((prevForm) => ({
        ...prevForm,
        techs: [...prevForm.techs, value],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        techs: prevForm.techs.filter((tech) => tech !== value),
      }));
    }
  };

  // --- ADD THESE HANDLERS FOR THE DIALOG BUTTONS ---

  // This function resets the form and closes the dialog
  const handleAddMore = () => {
    setOpen(false); // Close the dialog
    setForm(initial); // Reset the form fields
  };

  // This function closes the dialog and navigates home
  const handleMoveToHome = () => {
    setOpen(false); // Close the dialog
    navigate('/'); // Navigate to the Home page
  };
  // --------------------------------------------------

  return (
    <>
      <Paper sx={{ padding: "2%" }} elevation={3}>
        <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
          Create New Post
        </Typography>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {/* All your TextField and Box components` remain unchanged... */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              type="string"
              sx={{ width: "50%", margin: "2% auto" }}
              required
              onChange={(e) => setForm({ ...form, profile: e.target.value })}
              label="Job Profile"
              variant="outlined"
              value={profile}
            />
            <TextField
              min="0"
              type="number"
              sx={{ width: "50%", margin: "2% auto" }}
              required
              onChange={(e) => setForm({ ...form, exp: e.target.value })}
              label="Years of Experience"
              variant="outlined"
              value={exp}
            />
            <TextField
              type="string"
              sx={{ width: "50%", margin: "2% auto" }}
              required
              multiline
              rows={4}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              label="Job Description"
              variant="outlined"
              value={desc}
            />
            <Box sx={{ margin: "1% auto" }}>
              <h3>Please mention required skills</h3>
              <ul>
                {skillSet.map(({ name }, index) => {
                  return (
                    <li key={index}>
                      <div>
                        <div>
                          <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={name}
                            value={name}
                            onChange={handleChange}
                            // This ensures checkboxes reset when form is cleared
                            checked={form.techs.includes(name)} 
                          />
                          <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Box>
            <Button
              sx={{ width: "50%", margin: "2% auto" }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>

      {/* --- ADD THIS DIALOG COMPONENT --- */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)} // Optional: allow closing by clicking outside
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Job Post Saved!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your new job post has been successfully saved. What would you like to do next?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddMore}>Add Another Job</Button>
          <Button onClick={handleMoveToHome} autoFocus>
            Move to Home
          </Button>
        </DialogActions>
      </Dialog>
      {/* ---------------------------------- */}
    </>
  );
};

export default Create;