/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import {
  TableCell,
  TableRow,
  Checkbox,
  styled,
  IconButton,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { WrongVoca } from '../models/voca';
import useGetVocas from '../hooks/useGetVocas';
import useWrongQuery from '../hooks/useGetWrongVocas';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type WrongTableRowProps = {
  voca: WrongVoca;
};

export default function WrongTableRow({
  voca,
}: WrongTableRowProps): JSX.Element {
  const { vocas } = useGetVocas();

  const { mutateUpdateWrong, mutateRemoveWrong } = useWrongQuery();
  const handleImportantUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const isImportant = !!event?.target.checked;
    mutateUpdateWrong({ ...voca, isImportant });
  };

  const foundVoca = vocas?.find((singleVoca) => singleVoca.id === voca.id);

  const wrongAnswerRate =
    foundVoca &&
    `(${foundVoca.wrongCount}/${foundVoca.shownCount}) ${Math.round(
      (foundVoca.wrongCount / foundVoca.shownCount) * 100
    )}%`;

  const handleRemoveWrong = (): void => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    if (confirm(`정말 "${voca.eng}"을(를) 암기 하셨나요?`))
      mutateRemoveWrong(voca);
  };

  return (
    <StyledTableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        padding: 0,
      }}
    >
      <StyledTableCell align="center" component="th" scope="row">
        {voca.eng}
      </StyledTableCell>
      <StyledTableCell align="center">{voca.kor}</StyledTableCell>
      <StyledTableCell align="center">{wrongAnswerRate}</StyledTableCell>
      <StyledTableCell align="center">
        <Checkbox
          icon={<StarBorderIcon sx={{ color: 'orange' }} />}
          checkedIcon={<StarIcon sx={{ color: 'orange' }} />}
          checked={voca.isImportant}
          onChange={handleImportantUpdate}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton onClick={handleRemoveWrong}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
