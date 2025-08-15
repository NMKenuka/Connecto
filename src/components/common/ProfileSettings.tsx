import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const ProfileSettings: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with API call to update user
    console.log("Updated details:", { username, password });
    alert("Profile updated successfully!");
  };

  return (
    <Paper
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Profile Settings
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfileSettings;
