import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Event,
  LocationOn,
  AccessTime,
  People,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const BookingManagement: React.FC = () => {
  const { bookings, addBooking, updateBooking, deleteBooking } = useApp();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    availableDates: [] as dayjs.Dayjs[],
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(17).minute(0),
    durationPerPerson: 30,
    durationType: 'minutes' as 'minutes' | 'hours',
  });

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setEditingId(null);
    resetForm();
  };

  const handleEdit = (booking: any) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(booking.id);
    setFormData({
      name: booking.name,
      description: booking.description,
      location: booking.location,
      availableDates: booking.availableDates.map((date: string) => dayjs(date)),
      startTime: dayjs(booking.startTime, 'HH:mm'),
      endTime: dayjs(booking.endTime, 'HH:mm'),
      durationPerPerson: booking.durationPerPerson,
      durationType: booking.durationType,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      availableDates: [],
      startTime: dayjs().hour(9).minute(0),
      endTime: dayjs().hour(17).minute(0),
      durationPerPerson: 30,
      durationType: 'minutes',
    });
  };

  const handleSubmit = () => {
    const bookingData = {
      name: formData.name,
      description: formData.description,
      location: formData.location,
      availableDates: formData.availableDates.map(date => date.format('YYYY-MM-DD')),
      startTime: formData.startTime.format('HH:mm'),
      endTime: formData.endTime.format('HH:mm'),
      durationPerPerson: formData.durationPerPerson,
      durationType: formData.durationType,
      createdBy: user?.id || '',
    };

    if (editMode && editingId) {
      updateBooking(editingId, bookingData);
    } else {
      addBooking(bookingData);
    }

    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(id);
    }
  };

  const addDate = (date: dayjs.Dayjs | null) => {
    if (date && !formData.availableDates.some(d => d.isSame(date, 'day'))) {
      setFormData({
        ...formData,
        availableDates: [...formData.availableDates, date],
      });
    }
  };

  const removeDate = (index: number) => {
    setFormData({
      ...formData,
      availableDates: formData.availableDates.filter((_, i) => i !== index),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Manage Bookings
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpen}
          >
            Create New Booking
          </Button>
        </Box>

        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} md={6} lg={4} key={booking.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                      {booking.name}
                    </Typography>
                    <Box>
                      <IconButton size="small" onClick={() => handleEdit(booking)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(booking.id)} color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {booking.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{booking.location}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {booking.startTime} - {booking.endTime}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <People sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {booking.durationPerPerson} {booking.durationType} per person
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {booking.availableDates.slice(0, 3).map((date, index) => (
                      <Chip
                        key={index}
                        label={dayjs(date).format('MMM DD')}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                    {booking.availableDates.length > 3 && (
                      <Chip
                        label={`+${booking.availableDates.length - 3} more`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Slots: {booking.slots.length}
                    </Typography>
                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                      Booked: {booking.slots.filter(slot => slot.isBooked).length}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {bookings.length === 0 && (
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <Event sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    No bookings created yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Create your first booking to start accepting appointments from citizens.
                  </Typography>
                  <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Create First Booking
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Create/Edit Booking Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {editMode ? 'Edit Booking' : 'Create New Booking'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Booking Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Start Time"
                  value={formData.startTime}
                  onChange={(newValue) => newValue && setFormData({ ...formData, startTime: newValue })}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="End Time"
                  value={formData.endTime}
                  onChange={(newValue) => newValue && setFormData({ ...formData, endTime: newValue })}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration per Person"
                  type="number"
                  value={formData.durationPerPerson}
                  onChange={(e) => setFormData({ ...formData, durationPerPerson: Number(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Duration Type"
                  value={formData.durationType}
                  onChange={(e) => setFormData({ ...formData, durationType: e.target.value as 'minutes' | 'hours' })}
                >
                  <MenuItem value="minutes">Minutes</MenuItem>
                  <MenuItem value="hours">Hours</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Available Dates
                </Typography>
                <DatePicker
                  label="Add Date"
                  onChange={addDate}
                  sx={{ width: '100%', mb: 2 }}
                />
                <List sx={{ maxHeight: 200, overflow: 'auto' }}>
                  {formData.availableDates.map((date, index) => (
                    <div key={index}>
                      <ListItem
                        secondaryAction={
                          <Button size="small" onClick={() => removeDate(index)}>
                            Remove
                          </Button>
                        }
                      >
                        <ListItemText primary={date.format('MMMM DD, YYYY')} />
                      </ListItem>
                      {index < formData.availableDates.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editMode ? 'Update' : 'Create'} Booking
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default BookingManagement;