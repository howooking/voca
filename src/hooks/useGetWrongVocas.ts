import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { WrongVoca } from '../models/voca';
import queryKeys from '../utils/queryKeys';
import { getWrongs, removeWrong, updateWrong } from '../api/firebase';

type UseWrongQueryReturnType = {
  wrongs: WrongVoca[] | undefined;
  isLoading: boolean;
  mutateUpdateWrong: UseMutateFunction<void, unknown, WrongVoca, unknown>;
  mutateRemoveWrong: UseMutateFunction<void, unknown, WrongVoca, unknown>;
};

export default function useWrongQuery(): UseWrongQueryReturnType {
  const { uid } = useAuthContext();
  const client = useQueryClient();
  const { isLoading, data: wrongs } = useQuery(
    [queryKeys.getWrong(), uid],
    () => getWrongs(uid),
    {
      select: (data) => {
        return Object.values(data);
      },
    }
  );

  const { mutate: mutateUpdateWrong } = useMutation(
    (voca: WrongVoca) => updateWrong(uid, voca),
    {
      onSuccess: () => client.invalidateQueries([queryKeys.getWrong(), uid]),
    }
  );
  const { mutate: mutateRemoveWrong } = useMutation(
    (voca: WrongVoca) => removeWrong(uid, voca),
    {
      onSuccess: () => client.invalidateQueries([queryKeys.getWrong(), uid]),
    }
  );
  return { wrongs, isLoading, mutateUpdateWrong, mutateRemoveWrong };
}
