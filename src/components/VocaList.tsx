/* eslint-disable @typescript-eslint/no-shadow */
import { Alert, ListItemButton, ListItemText, Snackbar } from '@mui/material';
import { useState } from 'react';
import { Voca } from '../models/voca';
import { useAuthContext } from '../context/defaultAuthContext';
import {
  addWrong,
  shownCountPlusOne,
  wrongCountPlusOne,
} from '../api/firebase';

type VocaCardProps = {
  voca: Voca;
  i: number;
  answer: Voca | undefined;
  handleNextPage: () => void;
  isEnd: boolean;
  setIsEnd: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function VocaList({
  voca,
  i,
  answer,
  handleNextPage,
  isEnd,
  setIsEnd,
}: VocaCardProps): JSX.Element {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const handleCloseCloseSnackbar = (): void => setOpen(false);

  const [isRight, setIsRight] = useState(false);
  const isAnswer = voca.id === answer?.id;
  const handleAnswer = (event: any, answer: Voca | undefined): void => {
    if (event.target.innerText.slice(3) === answer?.kor) {
      setIsRight(true);
      setOpen(true);
      setIsEnd(true);
      shownCountPlusOne(answer);
      setTimeout(() => {
        handleNextPage();
        setIsEnd(false);
      }, 1000);
    } else {
      setIsRight(false);
      setOpen(true);
      setIsEnd(true);
      addWrong(user.uid, answer);
      wrongCountPlusOne(answer);
      setTimeout(() => {
        handleNextPage();
        setIsEnd(false);
      }, 2000);
    }
  };

  return (
    <>
      <ListItemButton
        sx={{ bgcolor: 'background.paper', width: '600px' }}
        onClick={(e) => handleAnswer(e, answer)}
        disabled={isEnd}
      >
        <ListItemText
          primary={`${i + 1}. ${voca.kor}`}
          sx={{ color: isAnswer ? 'black' : 'black' }}
        />
      </ListItemButton>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseCloseSnackbar}
      >
        <Alert
          severity={isRight ? 'success' : 'error'}
          onClose={handleCloseCloseSnackbar}
          elevation={6}
          sx={{ fontSize: 20, display: 'flex', alignItems: 'center' }}
        >
          {isRight
            ? `'${answer?.eng}'! 정답입니다😃😃`
            : `정답은 '${answer?.kor}'입니다😥😥 틀린단어에 추가됩니다.`}
        </Alert>
      </Snackbar>
    </>
  );
}
