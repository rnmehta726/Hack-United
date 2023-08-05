import * as React from 'react';
import Box from '@mui/joy/Box';

export default function Center({ children }) {
  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        flex: 1,
      }}
    >
      {children}
    </Box>
  );
}