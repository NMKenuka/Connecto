import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

interface DocumentViewerProps {
  documents: { name: string; url: string }[];
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documents }) => {
  return (
    <Box>
      <Typography variant="subtitle2" mb={1}>
        Uploaded Documents
      </Typography>
      <Stack spacing={1}>
        {documents.map((doc, idx) => (
          <Box
            key={idx}
            display="flex"
            alignItems="center"
            bgcolor="#f5f5f5"
            p={1}
            borderRadius={1}
          >
            <Typography flex={1}>{doc.name}</Typography>
            <Button
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              sx={{ ml: 2 }}
            >
              View / Download
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default DocumentViewer;
