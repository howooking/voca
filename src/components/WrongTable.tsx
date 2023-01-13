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
  Typography,
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
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Typography fontSize={{ xs: 10, md: 20 }}>틀린 단어</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography fontSize={{ xs: 10, md: 20 }}>뜻</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography fontSize={{ xs: 10, md: 20 }}>오답</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Checkbox
                  icon={
                    <StarBorderIcon
                      sx={{ color: 'orange', fontSize: { xs: 15, md: 30 } }}
                    />
                  }
                  checkedIcon={
                    <StarIcon
                      sx={{ color: 'orange', fontSize: { xs: 15, md: 30 } }}
                    />
                  }
                  checked={isImportantChecked}
                  onChange={handleImportantFilter}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography fontSize={{ xs: 10, md: 20 }}>삭제</Typography>
              </StyledTableCell>
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
