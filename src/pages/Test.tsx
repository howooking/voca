import { CircularProgress, List, Stack } from '@mui/material';
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

  const { isLoading, vocas } = useGetVocas();

  const shuffled = useMemo(
    () => vocas && [...vocas].sort(() => 0.5 - Math.random()),
    [vocas]
  );
  const { slicedVocas, answer } = useMemo(() => {
    if (!shuffled) {
      return { slicedVocas: undefined, answer: undefined };
    }
    const pagingVocas = shuffled.slice(5 * (page - 1), 5 * page);
    const randomizedAnswer = pagingVocas[Math.floor(Math.random() * 5)];
    return { slicedVocas: pagingVocas, answer: randomizedAnswer };
  }, [page, shuffled]);

  return (
    <>
      {isLoading && <CircularProgress />}
      <Stack alignItems="center">
        <CardPaper answer={answer} />
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
