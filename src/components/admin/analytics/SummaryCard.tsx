import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  color,
}) => (
  <Card sx={{ minWidth: 200, boxShadow: 2 }}>
    <CardContent>
      <Box display="flex" alignItems="center" mb={1}>
        {icon && <Box mr={1}>{icon}</Box>}
        <Typography
          variant="subtitle2"
          color={color || "primary"}
          fontWeight={600}
        >
          {title}
        </Typography>
      </Box>
      <Typography variant="h5" fontWeight={700} color={color || "primary"}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default SummaryCard;
