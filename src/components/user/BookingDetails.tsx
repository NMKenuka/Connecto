import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  CalendarMonth,
  Person,
  CheckCircle,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookings, bookSlot } = useApp();
  const { user } = useAuth();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [tokenNumber, setTokenNumber] = useState<string>('');

  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">
          Booking not found
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  const availableSlots = booking.slots.filter(slot => !slot.isBooked);
  const groupedSlots = availableSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, typeof availableSlots>);

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
    setConfirmOpen(true);
  };

  const handleConfirmBooking = () => {
    if (selectedSlot && user) {
      const token = bookSlot(booking.id, selectedSlot, user.id);
      setTokenNumber(token);
      setConfirmOpen(false);
      setReceiptOpen(true);
    }
  };

  const selectedSlotDetails = booking.slots.find(s => s.id === selectedSlot);

  return (
    <Box>
      <Button
        variant="text"
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 3 }}
      >
        ← Back to Dashboard
      </Button>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            {booking.name}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
            {booking.description}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {booking.location}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Operating Hours
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {booking.startTime} - {booking.endTime}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Duration per Person
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {booking.durationPerPerson} {booking.durationType}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarMonth sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Available Slots
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {availableSlots.length} remaining
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Available Time Slots
      </Typography>

      {Object.keys(groupedSlots).length > 0 ? (
        <Grid container spacing={3}>
          {Object.entries(groupedSlots).map(([date, slots]) => (
            <Grid item xs={12} md={6} key={date}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {dayjs(date).format('dddd, MMMM DD, YYYY')}
                </Typography>
                <Grid container spacing={1}>
                  {slots.map((slot) => (
                    <Grid item xs={6} sm={4} key={slot.id}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleSlotSelect(slot.id)}
                        sx={{
                          py: 1.5,
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                          },
                        }}
                      >
                        {slot.startTime} - {slot.endTime}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <CalendarMonth sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No available slots
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All slots for this service are currently booked. Please check back later.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Your Booking</DialogTitle>
        <DialogContent>
          {selectedSlotDetails && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                {booking.name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                <Typography variant="body1">
                  <strong>Date:</strong> {dayjs(selectedSlotDetails.date).format('dddd, MMMM DD, YYYY')}
                </Typography>
                <Typography variant="body1">
                  <strong>Time:</strong> {selectedSlotDetails.startTime} - {selectedSlotDetails.endTime}
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {booking.location}
                </Typography>
                <Typography variant="body1">
                  <strong>Duration:</strong> {booking.durationPerPerson} {booking.durationType}
                </Typography>
              </Box>
              <Alert severity="info">
                Once you confirm this booking, you will receive a digital token number. Please arrive 15 minutes before your scheduled time.
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmBooking} variant="contained">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={receiptOpen} onClose={() => setReceiptOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', color: 'success.main' }}>
          <CheckCircle sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h5" component="div">
            Booking Confirmed!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 3, fontWeight: 600 }}>
              Digital Receipt
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Token Number:</Typography>
                <Chip label={tokenNumber} color="primary" sx={{ fontWeight: 700 }} />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Service:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{booking.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Date:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {selectedSlotDetails && dayjs(selectedSlotDetails.date).format('MMM DD, YYYY')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Time:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {selectedSlotDetails && `${selectedSlotDetails.startTime} - ${selectedSlotDetails.endTime}`}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Location:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{booking.location}</Typography>
              </Box>
            </Box>
            
            <Alert severity="warning" sx={{ mt: 3 }}>
              Please arrive 15 minutes before your scheduled time and bring this token number.
            </Alert>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/my-bookings')} variant="contained" fullWidth>
            View My Bookings
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingDetails;