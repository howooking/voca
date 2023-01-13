import {
  Alert,
  Box,
  Button,
  CircularProgress,
  List,
  Snackbar,
  Stack,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Voca } from '../models/voca';
import SingleVocaChoice from '../components/SingleVocaChoice';
import useGetVocas from '../hooks/useGetVocas';
import CardPaper from '../components/CardPaper';
import { useAuthContext } from '../context/defaultAuthContext';
import {
  addWrong,
  shownCountPlusOne,
  wrongCountPlusOne,
} from '../api/firebase';

export default function Test(): JSX.Element {
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

  // 정답오답관련
  const { user, login } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const handleVocaItemClick = (answerVoca: Voca, voca: Voca): void => {
    if (answerVoca.id === voca.id) {
      setIsRight(true);
      setOpen(true);
      setIsEnd(true);
      shownCountPlusOne(answerVoca);
      setTimeout(() => {
        setOpen(false);
        handleNextPage();
        setIsEnd(false);
      }, 2500);
    } else {
      setIsRight(false);
      setOpen(true);
      setIsEnd(true);
      addWrong(user?.uid, answerVoca);
      wrongCountPlusOne(answerVoca);
      setTimeout(() => {
        setOpen(false);
        handleNextPage();
        setIsEnd(false);
      }, 2500);
    }
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {!user ? (
        <Button
          variant="contained"
          color="warning"
          sx={{
            my: 20,
            fontSize: 20,
            fontWeight: 'bold',
            height: '100px',
          }}
          onClick={login}
        >
          로그인 하러가기!
        </Button>
      ) : (
        <>
          {isLoading && <CircularProgress />}
          <Stack alignItems="center">
            <CardPaper answer={answer} />
            <Stack direction="row" alignItems="center">
              <List sx={{ m: 1 }}>
                {slicedVocas?.map((voca: Voca, i: number) => (
                  <SingleVocaChoice
                    key={voca.id}
                    voca={voca}
                    i={i}
                    onClick={() => handleVocaItemClick(answer, voca)}
                    isEnd={isEnd}
                  />
                ))}
              </List>
            </Stack>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={open}
              autoHideDuration={2400}
              onClose={() => setOpen(false)}
            >
              <Alert
                severity={isRight ? 'success' : 'error'}
                onClose={() => setOpen(false)}
                elevation={6}
                sx={{ fontSize: 20, display: 'flex', alignItems: 'center' }}
              >
                {isRight
                  ? `'${answer?.eng}'! 정답입니다😃😃`
                  : `정답은 '${answer?.kor}'입니다😥😥\n
              틀린단어에 추가됩니다.`}
              </Alert>
            </Snackbar>
          </Stack>
        </>
      )}
    </Box>
  );
}
