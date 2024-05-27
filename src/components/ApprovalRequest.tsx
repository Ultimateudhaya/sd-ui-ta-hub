import React from 'react';
import { Card, CardContent, Typography, Container, Box } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

export default function ApprovalRequest() {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <CheckCircleOutline sx={{ fontSize: 60, color: 'green' }} />
            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
              Openings Approved!
            </Typography>
            <Typography sx={{ mt: 1.5 }} color="text.secondary">
              Your job openings have been successfully approved.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
