import React, { useState } from 'react';
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
  Grid,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

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
      id={`register-tabpanel-${index}`}
      aria-labelledby={`register-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Register: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Citizen form state
  const [citizenData, setCitizenData] = useState({
    nic: '',
    email: '',
    fullName: '',
    address: '',
    dateOfBirth: null as dayjs.Dayjs | null,
    password: '',
    confirmPassword: '',
  });

  // Admin form state
  const [adminData, setAdminData] = useState({
    departmentEmail: '',
    departmentId: '',
    departmentName: '',
    password: '',
    confirmPassword: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const validateCitizenForm = () => {
    const { nic, email, fullName, address, dateOfBirth, password, confirmPassword } = citizenData;
    
    if (!nic || !email || !fullName || !address || !dateOfBirth || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const validateAdminForm = () => {
    const { departmentEmail, departmentId, departmentName, password, confirmPassword } = adminData;
    
    if (!departmentEmail || !departmentId || !departmentName || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(departmentEmail)) {
      setError('Please enter a valid department email address');
      return false;
    }
    
    return true;
  };

  const handleCitizenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateCitizenForm()) return;
    
    setLoading(true);
    const userData = {
      nic: citizenData.nic,
      email: citizenData.email,
      fullName: citizenData.fullName,
      address: citizenData.address,
      dateOfBirth: citizenData.dateOfBirth?.format('YYYY-MM-DD'),
    };
    
    const success = await register(userData, 'user');
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Registration failed. Please try again.');
    }
    setLoading(false);
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateAdminForm()) return;
    
    setLoading(true);
    const userData = {
      email: adminData.departmentEmail,
      departmentId: adminData.departmentId,
      fullName: adminData.departmentName,
    };
    
    const success = await register(userData, 'admin');
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ width: '100%', borderRadius: 3 }}>
            <Box sx={{ textAlign: 'center', pt: 4, pb: 2 }}>
              <Typography component="h1" variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Register for Connecto
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                Join the Government Digital Services Platform
              </Typography>
            </Box>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '1rem',
                },
              }}
            >
              <Tab label="Citizen Registration" />
              <Tab label="Government Registration" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box component="form" onSubmit={handleCitizenSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="NIC Number"
                      value={citizenData.nic}
                      onChange={(e) => setCitizenData({ ...citizenData, nic: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={citizenData.email}
                      onChange={(e) => setCitizenData({ ...citizenData, email: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Full Name"
                      value={citizenData.fullName}
                      onChange={(e) => setCitizenData({ ...citizenData, fullName: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Address"
                      multiline
                      rows={3}
                      value={citizenData.address}
                      onChange={(e) => setCitizenData({ ...citizenData, address: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Date of Birth"
                      value={citizenData.dateOfBirth}
                      onChange={(newValue) => setCitizenData({ ...citizenData, dateOfBirth: newValue })}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* Photo upload placeholder - would be implemented with file upload */}
                    <TextField
                      fullWidth
                      label="NIC Photo (Optional)"
                      helperText="Upload your NIC image (feature coming soon)"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      value={citizenData.password}
                      onChange={(e) => setCitizenData({ ...citizenData, password: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      value={citizenData.confirmPassword}
                      onChange={(e) => setCitizenData({ ...citizenData, confirmPassword: e.target.value })}
                    />
                  </Grid>
                </Grid>
                
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
                  {loading ? <CircularProgress size={24} /> : 'Register as Citizen'}
                </Button>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                      Already have an account? Sign in here
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box component="form" onSubmit={handleAdminSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Department Email"
                      type="email"
                      value={adminData.departmentEmail}
                      onChange={(e) => setAdminData({ ...adminData, departmentEmail: e.target.value })}
                      helperText="Official government department email address"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Government Department ID"
                      value={adminData.departmentId}
                      onChange={(e) => setAdminData({ ...adminData, departmentId: e.target.value })}
                      helperText="e.g., DEPT001, MOH-COL"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Department Name"
                      value={adminData.departmentName}
                      onChange={(e) => setAdminData({ ...adminData, departmentName: e.target.value })}
                      helperText="e.g., Ministry of Health"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      value={adminData.password}
                      onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      value={adminData.confirmPassword}
                      onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
                    />
                  </Grid>
                </Grid>
                
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
                  {loading ? <CircularProgress size={24} /> : 'Register Department'}
                </Button>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                      Already have an account? Sign in here
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </TabPanel>
          </Paper>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default Register;