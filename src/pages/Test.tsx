import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Voca } from '../models/voca';
import VocaList from '../components/VocaList';
import useGetVocas from '../hooks/useGetVocas';
import CardPaper from '../components/CardPaper';

export default function Test(): JSX.Element {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const handleNextPage = (): void => {
    setPage((prev) => prev + 1);
  };

  const [choice, setChoice] = useState<string>('5');
  const handleChoice = (event: SelectChangeEvent<string>): void => {
    setChoice(event.target.value);
  };

  const { isLoading, vocas } = useGetVocas();
  const shuffled = useMemo(
    () => vocas && [...vocas].sort(() => 0.5 - Math.random()),
    [vocas]
  );
  const slicedVocas = useMemo(
    () => shuffled?.slice(Number(choice) * (page - 1), Number(choice) * page),
    [choice, page, shuffled]
  );
  const answer = useMemo(
    () =>
      slicedVocas && slicedVocas[Math.floor(Math.random() * Number(choice))],
    [choice, slicedVocas]
  );

  return (
    <>
      {isLoading && <CircularProgress />}
      <Stack alignItems="center" sx={{ position: 'relative' }}>
        <CardPaper answer={answer} />
        <Box sx={{ minWidth: 120, position: 'absolute', right: 150, top: 30 }}>
          <FormControl fullWidth>
            <InputLabel id="choice" color="secondary">
              보기수
            </InputLabel>
            <Select
              color="secondary"
              labelId="choice"
              id="choice"
              value={choice}
              label="choice"
              onChange={handleChoice}
            >
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="7">7</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Stack direction="row" alignItems="center">
          <List>
            {slicedVocas?.map((voca: Voca, i: number) => (
              <VocaList
                key={voca.id}
                voca={voca}
                i={i}
                answer={answer}
                handleNextPage={handleNextPage}
                isEnd={isEnd}
                setIsEnd={setIsEnd}
              />
            ))}
          </List>
        </Stack>
      </Stack>
    </>
  );
}
