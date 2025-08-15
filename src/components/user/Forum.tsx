import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";

const SERVICE_CATEGORIES = [
  "Visa Services",
  "Healthcare",
  "Transport",
  "Education",
  "Housing",
  "Other",
];

const initialPosts = [
  {
    id: 1,
    name: "Jane Citizen",
    category: "Healthcare",
    feedback: "The new appointment system is very helpful!",
    createdAt: dayjs().subtract(2, "hour").toISOString(),
  },
  {
    id: 2,
    name: "John Doe",
    category: "Transport",
    feedback: "Bus schedules need to be updated more frequently.",
    createdAt: dayjs().subtract(1, "day").toISOString(),
  },
];

const Forum: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(initialPosts);
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState<string>("");

  const handlePost = () => {
    if (!feedback || !category) return;
    setPosts([
      {
        id: Date.now(),
        name: user?.fullName || user?.username || "Citizen",
        category,
        feedback,
        createdAt: new Date().toISOString(),
      },
      ...posts,
    ]);
    setFeedback("");
    setCategory("");
  };

  const filteredPosts = filter
    ? posts.filter((post) => post.category === filter)
    : posts;

  return (
    <Box sx={{ mt: 2 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: (theme) => theme.palette.primary.light + "11",
        }}
      >
        <Typography variant="h5" fontWeight={700} color="primary.main">
          Forum
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Post Creation */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Share Feedback
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Your feedback"
                multiline
                minRows={2}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                fullWidth
                sx={{ flex: 2 }}
              />
              <FormControl sx={{ minWidth: 160 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                sx={{ minWidth: 120, height: 56 }}
                onClick={handlePost}
                disabled={!feedback || !category}
              >
                Post
              </Button>
            </Stack>
          </Paper>

          {/* Posts List */}
          <Stack spacing={2}>
            {filteredPosts.length === 0 ? (
              <Typography color="text.secondary" align="center">
                No posts yet.
              </Typography>
            ) : (
              filteredPosts.map((post) => (
                <Card key={post.id} variant="outlined" sx={{ boxShadow: 1 }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      mb={1}
                    >
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {post.name[0]}
                      </Avatar>
                      <Typography fontWeight={600}>{post.name}</Typography>
                      <Chip
                        label={post.category}
                        color="secondary"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: "auto" }}
                      >
                        {dayjs(post.createdAt).format("MMM D, YYYY h:mm A")}
                      </Typography>
                    </Stack>
                    <Typography>{post.feedback}</Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>
        </Grid>

        {/* Filter Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Filter by Category
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip
                label="All"
                clickable
                color={!filter ? "primary" : "default"}
                onClick={() => setFilter("")}
                sx={{ mb: 1 }}
              />
              {SERVICE_CATEGORIES.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  clickable
                  color={filter === cat ? "primary" : "default"}
                  onClick={() => setFilter(cat)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Forum;
