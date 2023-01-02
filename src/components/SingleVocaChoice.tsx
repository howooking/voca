/* eslint-disable @typescript-eslint/no-shadow */
import { ListItemButton, ListItemText } from '@mui/material';
import { Voca } from '../models/voca';

type VocaCardProps = {
  voca: Voca;
  i: number;
  onClick: () => void;
  isEnd: boolean;
};

export default function SingleVocaChoice({
  voca,
  i,
  onClick,
  isEnd,
}: VocaCardProps): JSX.Element {
  return (
    <ListItemButton
      sx={{ bgcolor: 'background.paper', width: '600px' }}
      disabled={isEnd}
      onClick={onClick}
    >
      <ListItemText primary={`${i + 1}. ${voca.kor}`} sx={{ color: 'black' }} />
    </ListItemButton>
  );
}
