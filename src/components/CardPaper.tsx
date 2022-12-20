import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Voca } from '../models/voca';

type CardPaperProps = {
  answer: Voca | undefined;
};

export default function CardPaper({ answer }: CardPaperProps): JSX.Element {
  return (
    <Paper elevation={3} sx={{ width: '300px', height: '180px', m: 3 }}>
      <Typography variant="h4" align="center" lineHeight="180px">
        {answer?.eng}
      </Typography>
    </Paper>
  );
}
