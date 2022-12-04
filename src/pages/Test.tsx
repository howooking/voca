import { Box, List, Divider } from '@mui/material';
import { useState } from 'react';
import { VocaInfo } from '../models/voca';
import VocaList from '../components/VocaList';
import useGetRandomVocas from '../hooks/useGetRandomVocas';
import VocaCard from '../components/VocaCard';

export default function Test(): JSX.Element {
  const { isError, isLoading, randomVocas } = useGetRandomVocas(5);
  const [isFront, setIsFront] = useState<boolean>(true);
  const handleFlip = (): void => {
    setIsFront((prev) => !prev);
  };
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
      <Box sx={{ perspective: '300px' }}>
        <VocaCard
          front
          isFront={isFront}
          randomVocas={randomVocas}
          handleFlip={handleFlip}
        />
        <VocaCard
          front={false}
          isFront={isFront}
          randomVocas={randomVocas}
          handleFlip={handleFlip}
        />
      </Box>

      <List>
        {randomVocas &&
          randomVocas.map((voca: VocaInfo, i: number) => (
            <>
              <VocaList key={voca.eng} text={voca.kor} i={i} />
              <Divider
                sx={{ display: i === randomVocas.length - 1 ? 'none' : 'box' }}
              />
            </>
          ))}
      </List>
    </Box>
  );
}
