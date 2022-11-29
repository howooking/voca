import { useQuery } from '@tanstack/react-query';
import { Box, Typography, Card } from '@mui/material';
import { Voca } from '../models/voca';
import getVocas from '../api/firebase';
import VocaCard from '../components/VocaCard';

export default function Test() {
  const { isLoading, isError, data: vocas } = useQuery(['voca'], getVocas);

  const randomVocaGenerator = () => {
    const randomVoca = [];
    for (let i = 0; i < 5; i += 1) {
      const chosenVoca = vocas && vocas[Math.floor(Math.random() * 1220) + 1];
      randomVoca.push(chosenVoca);
    }
    return randomVoca;
  };
  const randomFive = randomVocaGenerator();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          height: '100px',
          width: '200px',
          my: 2,
          p: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', lineHeight: '100px' }}
        >
          {randomFive &&
            randomFive[Math.floor(Math.random() * 5)].eng.toUpperCase()}
        </Typography>
      </Card>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {randomFive &&
          randomFive.map((voca: Voca, i: number) => (
            <VocaCard key={voca.eng} text={voca.kor} i={i} />
          ))}
      </Box>
    </Box>
  );
}
