import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Tab,
  Tabs,
  Card,
  CardContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Login: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    const role = tabValue === 0 ? "user" : "admin";
    const success = await login(email, password, role);

    if (success) {
      navigate(role === "admin" ? "/admin/dashboard" : "/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ width: "100%", borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", pt: 4, pb: 2 }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              Connecto
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Connect Citizen to Government
            </Typography>
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
                fontSize: "1rem",
              },
            }}
          >
            <Tab label="Citizen Login" />
            <Tab label="Government Login" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Card
              variant="outlined"
              sx={{ backgroundColor: "secondary.main", mb: 3 }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  color="primary.main"
                  sx={{ fontWeight: 500 }}
                >
                  <strong>Demo Credentials:</strong>
                  <br />
                  Email: citizen@demo.com
                  <br />
                  Password: password123
                </Typography>
              </CardContent>
            </Card>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="citizen-email"
                label="Email or NIC Number"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="citizen-password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    sx={{ fontWeight: 500 }}
                  >
                    Don't have an account? Register here
                  </Typography>
                </Link>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Card
              variant="outlined"
              sx={{ backgroundColor: "secondary.main", mb: 3 }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  color="primary.main"
                  sx={{ fontWeight: 500 }}
                >
                  <strong>Demo Credentials:</strong>
                  <br />
                  Email: admin@gov.lk
                  <br />
                  Password: admin123
                </Typography>
              </CardContent>
            </Card>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="admin-email"
                label="Department Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="admin-password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    sx={{ fontWeight: 500 }}
                  >
                    Need admin access? Register your department
                  </Typography>
                </Link>
              </Box>
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
