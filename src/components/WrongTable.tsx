import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  styled,
  Checkbox,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import WrongTableRow from './WrongTableRow';
import useWrongQuery from '../hooks/useGetWrongVocas';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

export default function WrongTable(): JSX.Element {
  const { isLoading, wrongs } = useWrongQuery();

  const [isImportantChecked, setIsImportantChecked] = useState(false);
  const handleImportantFilter = (): void => {
    setIsImportantChecked((prev) => !prev);
  };

  return (
    <>
      {isLoading && <CircularProgress />}
      <TableContainer
        sx={{ width: '100%', height: '100%', margin: 'auto', bgcolor: 'white' }}
      >
        <Table sx={{ width: '100%' }} stickyHeader size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">틀린 단어</StyledTableCell>
              <StyledTableCell align="center">뜻</StyledTableCell>
              <StyledTableCell align="center">오답률</StyledTableCell>
              <StyledTableCell align="center">
                <Checkbox
                  icon={<StarBorderIcon sx={{ color: 'orange' }} />}
                  checkedIcon={<StarIcon sx={{ color: 'orange' }} />}
                  checked={isImportantChecked}
                  onChange={handleImportantFilter}
                />
              </StyledTableCell>
              <StyledTableCell align="center">삭제</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wrongs
              ?.sort((a, b) => b.addedDate - a.addedDate)
              .sort((a, b) =>
                isImportantChecked
                  ? Number(b.isImportant) - Number(a.isImportant)
                  : b.addedDate - a.addedDate
              )
              .map((voca) => (
                <WrongTableRow key={voca.id} voca={voca} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
