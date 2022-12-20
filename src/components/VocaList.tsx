/* eslint-disable @typescript-eslint/no-shadow */
import { ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { Voca } from '../models/voca';

type VocaCardProps = {
  voca: Voca;
  i: number;
  answer: Voca | undefined;
};
const handleColor = () => {};

export default function VocaList({
  voca,
  i,
  answer,
}: VocaCardProps): JSX.Element {
  const [isEnd, setIsEnd] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const isAnswer = voca.id === answer?.id;
  const handleAnswer = (event, answer: Voca | undefined): void => {
    if (event.target.innerText.slice(3) === answer?.kor) {
      setIsRight(true);
      setIsEnd(true);
    } else {
      setIsRight(false);
      setIsEnd(true);
    }
  };
  console.log({ isRight, isEnd });

  return (
    <ListItemButton
      sx={{ bgcolor: 'background.paper', width: '600px' }}
      onClick={(e) => handleAnswer(e, answer)}
    >
      <ListItemText
        primary={`${i + 1}. ${voca.kor}`}
        sx={{ color: isEnd && isAnswer ? 'red' : 'black' }}
      />
    </ListItemButton>
  );
}
