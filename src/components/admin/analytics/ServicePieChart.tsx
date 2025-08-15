import React from "react";
import { Pie } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";

interface ServicePieChartProps {
  data: any;
}

const ServicePieChart: React.FC<ServicePieChartProps> = ({ data }) => (
  <Paper sx={{ p: 3, mb: 3 }}>
    <Typography variant="subtitle1" fontWeight={600} mb={2}>
      Booking Distribution by Service
    </Typography>
    <Pie
      data={data}
      options={{ responsive: true, animation: { duration: 800 } }}
    />
  </Paper>
);

export default ServicePieChart;
