import { Card, Typography } from '@mui/material';

type VocaCardProps = {
  text: string;
  i: number;
};

export default function VocaCard({ text, i }: VocaCardProps) {
  return (
    <Card sx={{ height: '50px', minWidth: '500px', my: 1, p: 2 }}>
      <Typography variant="h6" sx={{ lineHeight: '50px' }}>
        {i + 1}. {text}
      </Typography>
    </Card>
  );
}
