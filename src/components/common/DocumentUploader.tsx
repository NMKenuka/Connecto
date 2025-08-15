import React, { useRef } from "react";
import { Box, Button, Typography, Stack, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface DocumentUploaderProps {
  files: File[];
  setFiles: (files: File[]) => void;
  maxSizeMB?: number;
  accept?: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  files,
  setFiles,
  maxSizeMB = 5,
  accept = ".pdf,.jpg,.jpeg,.png",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const validFiles = newFiles.filter((file) => {
      const isValidType = accept
        .split(",")
        .some((type) => file.name.toLowerCase().endsWith(type.trim()));
      const isValidSize = file.size <= maxSizeMB * 1024 * 1024;
      return isValidType && isValidSize;
    });
    setFiles([...files, ...validFiles]);
  };

  const handleRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={() => inputRef.current?.click()}
        sx={{ mb: 2 }}
      >
        Upload Documents
      </Button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Stack spacing={1}>
        {files.map((file, idx) => (
          <Box
            key={idx}
            display="flex"
            alignItems="center"
            bgcolor="#f5f5f5"
            p={1}
            borderRadius={1}
          >
            <Typography flex={1}>{file.name}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mx: 1 }}>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </Typography>
            <IconButton
              onClick={() => handleRemove(idx)}
              size="small"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default DocumentUploader;
