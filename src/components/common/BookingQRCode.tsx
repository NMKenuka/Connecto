import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Box, Typography } from "@mui/material";

interface BookingQRCodeProps {
  bookingId: string;
}

const BookingQRCode: React.FC<BookingQRCodeProps> = ({ bookingId }) => {
  // The value can be a URL or a unique string for the booking
  const qrValue = `booking:${bookingId}`;
  return (
    <Box textAlign="center" my={2}>
      <Typography variant="subtitle2" color="text.secondary" mb={1}>
        Your Booking QR Code
      </Typography>
      <QRCodeSVG value={qrValue} size={160} fgColor="#1976d2" />
    </Box>
  );
};

export default BookingQRCode;
