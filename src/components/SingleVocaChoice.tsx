/* eslint-disable @typescript-eslint/no-shadow */
import { ListItemButton, ListItemText, Typography } from '@mui/material';
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
      sx={{ bgcolor: 'background.paper', minWidth: 350, m: 1 }}
      disabled={isEnd}
      onClick={onClick}
    >
      <ListItemText>
        <Typography sx={{ fontSize: { xs: 15, md: 20 } }}>{`${i + 1}. ${
          voca.kor
        }`}</Typography>
      </ListItemText>
    </ListItemButton>
  );
}
