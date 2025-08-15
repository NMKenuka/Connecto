import React from "react";
import { Line } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";

interface BookingsLineChartProps {
  data: any;
}

const BookingsLineChart: React.FC<BookingsLineChartProps> = ({ data }) => (
  <Paper sx={{ p: 3, mb: 3 }}>
    <Typography variant="subtitle1" fontWeight={600} mb={2}>
      Bookings Per Day (Last 30 Days)
    </Typography>
    <Line
      data={data}
      options={{ responsive: true, animation: { duration: 800 } }}
    />
  </Paper>
);

export default BookingsLineChart;
