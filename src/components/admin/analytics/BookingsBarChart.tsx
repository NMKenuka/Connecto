import React from "react";
import { Bar } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";

interface BookingsBarChartProps {
  data: any;
}

const BookingsBarChart: React.FC<BookingsBarChartProps> = ({ data }) => (
  <Paper sx={{ p: 3, mb: 3 }}>
    <Typography variant="subtitle1" fontWeight={600} mb={2}>
      Peak Booking Hours
    </Typography>
    <Bar
      data={data}
      options={{ responsive: true, animation: { duration: 800 } }}
    />
  </Paper>
);

export default BookingsBarChart;
