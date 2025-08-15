import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  CalendarMonth,
  Campaign,
  AccessTime,
  LocationOn,
  ArrowForward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, notices, userBookings } = useApp();
  const { user } = useAuth();

  const myUpcomingBookings = userBookings.filter(
    (booking) => booking.userId === user?.id && booking.status === "upcoming"
  );

  const availableBookings = bookings.filter((booking) =>
    booking.slots.some((slot) => !slot.isBooked)
  );

  const latestNotices = notices.slice(0, 3);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome, {user?.fullName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Access government services and manage your appointments
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Quick Stats */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", py: 2 }}>
            <CardContent>
              <CalendarMonth
                sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {myUpcomingBookings.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Appointments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", py: 2 }}>
            <CardContent>
              <Campaign sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {notices.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Notices
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", py: 2 }}>
            <CardContent>
              <AccessTime sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {availableBookings.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available Services
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              textAlign: "center",
              py: 2,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
              },
            }}
            onClick={() => navigate("/my-bookings")}
          >
            <CardContent>
              <ArrowForward
                sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
              />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                View All
              </Typography>
              <Typography variant="body2" color="text.secondary">
                My Bookings
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Latest Notices */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Latest Notices & Updates
              </Typography>
              <Chip
                label={`${notices.length} Active`}
                color="primary"
                size="small"
              />
            </Box>

            {latestNotices.length > 0 ? (
              <List>
                {latestNotices.map((notice, index) => (
                  <div key={notice.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {notice.title}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              sx={{ mb: 1 }}
                            >
                              {notice.description}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Posted {dayjs(notice.createdAt).fromNow()}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < latestNotices.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            ) : (
              <Typography
                color="text.secondary"
                sx={{ textAlign: "center", py: 4 }}
              >
                No notices available
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Available Services */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Available Services
            </Typography>

            {availableBookings.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {availableBookings.slice(0, 3).map((booking) => (
                  <Card
                    key={booking.id}
                    variant="outlined"
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: "0 4px 16px rgba(107, 45, 20, 0.1)",
                      },
                    }}
                    onClick={() => navigate(`/booking/${booking.id}`)}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        {booking.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <LocationOn
                          sx={{ fontSize: 14, mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {booking.location}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${
                          booking.slots.filter((s) => !s.isBooked).length
                        } slots available`}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </CardContent>
                  </Card>
                ))}

                <Button
                  variant="outlined"
                  onClick={() => navigate("/services")}
                  sx={{ mt: 1 }}
                >
                  View All Services
                </Button>
              </Box>
            ) : (
              <Typography
                color="text.secondary"
                sx={{ textAlign: "center", py: 4 }}
              >
                No services available at the moment
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* My Upcoming Appointments */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              My Upcoming Appointments
            </Typography>

            {myUpcomingBookings.length > 0 ? (
              <Grid container spacing={2}>
                {myUpcomingBookings.slice(0, 3).map((booking) => {
                  const bookingDetails = bookings.find(
                    (b) => b.id === booking.bookingId
                  );
                  return (
                    <Grid item xs={12} md={4} key={booking.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {bookingDetails?.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <CalendarMonth
                              sx={{
                                fontSize: 16,
                                mr: 1,
                                color: "text.secondary",
                              }}
                            />
                            <Typography variant="body2">
                              {dayjs(booking.bookingDate).format(
                                "MMM DD, YYYY"
                              )}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <AccessTime
                              sx={{
                                fontSize: 16,
                                mr: 1,
                                color: "text.secondary",
                              }}
                            />
                            <Typography variant="body2">
                              {booking.startTime} - {booking.endTime}
                            </Typography>
                          </Box>
                          <Chip
                            label={`Token: ${booking.tokenNumber}`}
                            size="small"
                            color="primary"
                            sx={{ mt: 1 }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CalendarMonth
                  sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                />
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  No upcoming appointments
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate("/services")}
                >
                  Book a Service
                </Button>
              </Box>
            )}

            {myUpcomingBookings.length > 3 && (
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/my-bookings")}
                >
                  View All My Bookings
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
