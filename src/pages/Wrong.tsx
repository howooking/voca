import { Box, Button } from '@mui/material';
import WrongTable from '../components/WrongTable';
import { useAuthContext } from '../context/defaultAuthContext';

export default function Wrong(): JSX.Element {
  const { user, login } = useAuthContext();
  return <WrongTable />;
}
