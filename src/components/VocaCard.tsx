import { Typography, Card, Button } from '@mui/material';
import { Voca } from '../models/voca';

type VocaCardProps = {
  isFront: boolean;
  randomVocas: Voca[];
  front: boolean;
  handleFlip: () => void;
};

export default function VocaCard({
  isFront,
  randomVocas,
  front,
  handleFlip,
}: VocaCardProps): JSX.Element {
  const transformSx = (): string => {
    if (front) return isFront ? 'rotateX(0deg)' : 'rotateX(180deg)';
    return isFront ? 'rotateX(-180deg)' : 'rotateX(0deg)';
  };
  return (
    <Card
      sx={{
        height: '100px',
        width: '200px',
        my: 2,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        transition: '0.5s',
        backfaceVisibility: 'hidden',
        position: front ? 'absolute' : 'relative',
        transform: transformSx(),
      }}
    >
      <Typography
        variant={front ? 'h6' : 'subtitle2'}
        sx={{ textAlign: 'center' }}
      >
        {front
          ? randomVocas[Math.floor(Math.random() * 5)].eng.toUpperCase()
          : randomVocas[Math.floor(Math.random() * 5)].kor.toUpperCase()}
      </Typography>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={handleFlip}
      >
        {front ? 'Flip' : '덮기'}
      </Button>
    </Card>
  );
}
