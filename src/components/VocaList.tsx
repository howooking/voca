import { ListItemButton, ListItemText } from '@mui/material';

type VocaCardProps = {
  text: string;
  i: number;
};

export default function VocaList({ text, i }: VocaCardProps): JSX.Element {
  return (
    <ListItemButton sx={{ bgcolor: 'background.paper', minWidth: '600px' }}>
      <ListItemText primary={`${i + 1}. ${text}`} />
    </ListItemButton>
  );
}
