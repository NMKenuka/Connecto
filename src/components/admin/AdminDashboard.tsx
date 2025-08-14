import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
} from '@mui/material';
import {
  CalendarMonth,
  Campaign,
  People,
  TrendingUp,
  Add,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import dayjs from 'dayjs';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, notices, userBookings } = useApp();

  const totalBookings = bookings.length;
  const totalSlots = bookings.reduce((acc, booking) => acc + booking.slots.length, 0);
  const bookedSlots = bookings.reduce((acc, booking) => 
    acc + booking.slots.filter(slot => slot.isBooked).length, 0
  );
  const availableSlots = totalSlots - bookedSlots;

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: <CalendarMonth />,
      color: '#1976d2',
      action: () => navigate('/admin/bookings'),
    },
    {
      title: 'Active Notices',
      value: notices.length,
      icon: <Campaign />,
      color: '#2e7d32',
      action: () => navigate('/admin/notices'),
    },
    {
      title: 'Booked Slots',
      value: bookedSlots,
      icon: <People />,
      color: '#ed6c02',
    },
    {
      title: 'Available Slots',
      value: availableSlots,
      icon: <TrendingUp />,
      color: '#9c27b0',
    },
  ];

  const recentBookings = userBookings
    .slice(0, 5)
    .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/admin/bookings')}
          >
            Create Booking
          </Button>
          <Button
            variant="outlined"
            startIcon={<Campaign />}
            onClick={() => navigate('/admin/notices')}
          >
            Post Notice
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                cursor: stat.action ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                '&:hover': stat.action ? {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                } : {},
              }}
              onClick={stat.action}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color, opacity: 0.7 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Bookings */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Recent Bookings
            </Typography>
            {recentBookings.length > 0 ? (
              <List>
                {recentBookings.map((booking) => {
                  const bookingDetails = bookings.find(b => b.id === booking.bookingId);
                  return (
                    <ListItem
                      key={booking.id}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        mb: 1,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {bookingDetails?.name || 'Booking'}
                            </Typography>
                            <Chip
                              label={booking.status}
                              color={booking.status === 'upcoming' ? 'primary' : 'default'}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Token: {booking.tokenNumber} | Date: {dayjs(booking.bookingDate).format('MMM DD, YYYY')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Time: {booking.startTime} - {booking.endTime}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                No recent bookings
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<CalendarMonth />}
                onClick={() => navigate('/admin/bookings')}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                Manage Bookings
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Campaign />}
                onClick={() => navigate('/admin/notices')}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                Post New Notice
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<People />}
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                View User Reports
              </Button>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                System Status
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">System Health</Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Database</Typography>
                  <Chip label="Connected" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Last Updated</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dayjs().format('HH:mm')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;