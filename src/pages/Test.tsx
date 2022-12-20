import { CircularProgress, IconButton, List, Stack } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Voca } from '../models/voca';
import VocaList from '../components/VocaList';
import useGetAllVocas from '../hooks/useGetAllVocas';
import CardPaper from '../components/CardPaper';

export default function Test(): JSX.Element {
  const { isLoading, vocas } = useGetAllVocas();
  function getMultipleRandom(num: number): Voca[] | undefined {
    const shuffled = vocas && [...vocas].sort(() => 0.5 - Math.random());
    return shuffled?.slice(0, num);
  }
  const randomVocas = getMultipleRandom(5);
  const answer = randomVocas && randomVocas[Math.floor(Math.random() * 4) + 1];
  console.log({ rand5: randomVocas, answer });

  return (
    <>
      {isLoading && <CircularProgress />}
      <Stack alignItems="center">
        <CardPaper answer={answer} />
        <Stack direction="row" alignItems="center">
          <IconButton sx={{ m: 2 }} size="large">
            <ArrowBackIosIcon sx={{ fontSize: 30 }} />
          </IconButton>

          <List>
            {randomVocas?.map((voca: Voca, i: number) => (
              <VocaList key={voca.id} voca={voca} i={i} answer={answer} />
            ))}
          </List>
          <IconButton sx={{ m: 2 }} size="large">
            <ArrowForwardIosIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
}
