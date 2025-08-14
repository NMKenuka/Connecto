import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Paper,
} from '@mui/material';
import {
  CalendarMonth,
  AccessTime,
  LocationOn,
  ConfirmationNumber,
  EventAvailable,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, userBookings } = useApp();
  const { user } = useAuth();

  const myBookings = userBookings.filter(booking => booking.userId === user?.id);
  
  const upcomingBookings = myBookings.filter(booking => booking.status === 'upcoming');
  const pastBookings = myBookings.filter(booking => booking.status === 'completed');

  const getBookingDetails = (bookingId: string) => {
    return bookings.find(b => b.id === bookingId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const BookingCard = ({ booking }: { booking: any }) => {
    const bookingDetails = getBookingDetails(booking.bookingId);
    
    return (
      <Card sx={{ 
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
              {bookingDetails?.name || 'Service Booking'}
            </Typography>
            <Chip
              label={booking.status}
              color={getStatusColor(booking.status) as any}
              size="small"
              sx={{ textTransform: 'capitalize' }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarMonth sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              {dayjs(booking.bookingDate).format('dddd, MMMM DD, YYYY')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTime sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              {booking.startTime} - {booking.endTime}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOn sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">
              {bookingDetails?.location || 'Location not specified'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ConfirmationNumber sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Token: {booking.tokenNumber}
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Booked on {dayjs(booking.createdAt).format('MMM DD, YYYY')}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
        My Bookings
      </Typography>

      {/* Upcoming Bookings */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Upcoming Appointments ({upcomingBookings.length})
        </Typography>
        
        {upcomingBookings.length > 0 ? (
          <Grid container spacing={3}>
            {upcomingBookings.map((booking) => (
              <Grid item xs={12} md={6} lg={4} key={booking.id}>
                <BookingCard booking={booking} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <EventAvailable sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No upcoming appointments
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Book a new appointment to access government services.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/dashboard')}>
              Book New Service
            </Button>
          </Paper>
        )}
      </Box>

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Past Appointments ({pastBookings.length})
          </Typography>
          
          <Grid container spacing={3}>
            {pastBookings.map((booking) => (
              <Grid item xs={12} md={6} lg={4} key={booking.id}>
                <BookingCard booking={booking} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {myBookings.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <EventAvailable sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No bookings yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            You haven't made any appointments yet. Browse available services and book your first appointment.
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/dashboard')}>
            Browse Services
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default MyBookings;