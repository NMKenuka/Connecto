import React from "react";
import { Grid } from "@mui/material";
import SummaryCard from "./SummaryCard";
import { useApp } from "../../../context/AppContext";
import { EventAvailable, EventNote } from "@mui/icons-material";

const Analytics: React.FC = () => {
  const { bookings, userBookings } = useApp();
  const totalBookings = bookings.length;
  const upcomingBookings = userBookings.filter(
    (b) => b.status === "upcoming"
  ).length;

  return (
    <div>
      <h1>Analytics</h1>
      <p>Booking Trends & Insights</p>
      <Grid container spacing={3} sx={{ my: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Total Bookings"
            value={totalBookings}
            icon={<EventNote color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Upcoming Bookings"
            value={upcomingBookings}
            icon={<EventAvailable color="success" />}
            color="success.main"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Analytics;
