/* eslint-disable @typescript-eslint/no-shadow */
import { Alert, ListItemButton, ListItemText, Snackbar } from '@mui/material';
import { useState } from 'react';
import { Voca } from '../models/voca';

type VocaCardProps = {
  voca: Voca;
  i: number;
  answer: Voca | undefined;
  handleNextPage: () => void;
};

const handleColor = () => {};

export default function VocaList({
  voca,
  i,
  answer,
  handleNextPage,
}: VocaCardProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleCloseCloseSnackbar = () => setOpen(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const isAnswer = voca.id === answer?.id;
  const handleAnswer = (event, answer: Voca | undefined): void => {
    if (event.target.innerText.slice(3) === answer?.kor) {
      setIsRight(true);
      setIsEnd(true);
      setOpen(true);
      setTimeout(() => {
        handleNextPage();
      }, 2000);
    } else {
      setIsRight(false);
      setIsEnd(true);
      setOpen(true);
      setTimeout(() => {
        handleNextPage();
      }, 3000);
    }
  };
  console.log({ isRight, isEnd });

  return (
    <>
      <ListItemButton
        sx={{ bgcolor: 'background.paper', width: '600px' }}
        onClick={(e) => handleAnswer(e, answer)}
      >
        <ListItemText
          primary={`${i + 1}. ${voca.kor}`}
          sx={{ color: isEnd && isAnswer ? 'red' : 'black' }}
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
          {isRight ? '정답입니다😃😃' : '오답입니다😥😥 틀린단어에 추가됩니다.'}
        </Alert>
      </Snackbar>
    </>
  );
}
