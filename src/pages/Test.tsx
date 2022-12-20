import { CircularProgress, IconButton, List, Stack } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from 'react';
import { Voca } from '../models/voca';
import VocaList from '../components/VocaList';
import useGetAllVocas from '../hooks/useGetAllVocas';
import CardPaper from '../components/CardPaper';

export default function Test(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };
  const { isLoading, vocas } = useGetAllVocas();
  // function getMultipleRandom(): Voca[] | undefined {
  //   return vocas && [...vocas].sort(() => 0.5 - Math.random());
  // }

  const randomVocas = vocas?.slice(5 * (page - 1), 5 * page);
  const answer = randomVocas && randomVocas[Math.floor(Math.random() * 4) + 1];
  console.log({ rand5: randomVocas, answer });

  return (
    <>
      {isLoading && <CircularProgress />}
      <Stack alignItems="center">
        <CardPaper answer={answer} />
        <Stack direction="row" alignItems="center">
          <IconButton
            sx={{ m: 2 }}
            size="large"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <ArrowBackIosIcon sx={{ fontSize: 30 }} />
          </IconButton>

          <List>
            {randomVocas?.map((voca: Voca, i: number) => (
              <VocaList
                key={voca.id}
                voca={voca}
                i={i}
                answer={answer}
                handleNextPage={handleNextPage}
              />
            ))}
          </List>
          <IconButton sx={{ m: 2 }} size="large" onClick={handleNextPage}>
            <ArrowForwardIosIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
}
