import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/defaultAuthContext';
import { WrongVoca } from '../models/voca';
import queryKeys from '../utils/queryKeys';
import { getWrongs, removeWrong, updateWrong } from '../api/firebase';

export default function useWrongQuery(): typeof result {
  const { user } = useAuthContext();
  const client = useQueryClient();
  const { isLoading, data: wrongs } = useQuery(
    [queryKeys.getWrong(), user?.uid],
    () => getWrongs(user?.uid),
    {
      select: (data) => {
        return Object.values(data);
      },
    }
  );

  const { mutate: mutateUpdateWrong } = useMutation(
    (voca: WrongVoca) => updateWrong(user?.uid, voca),
    {
      onSettled: () =>
        client.invalidateQueries([queryKeys.getWrong(), user?.uid]),
    }
  );
  const { mutate: mutateRemoveWrong } = useMutation(
    (voca: WrongVoca) => removeWrong(user?.uid, voca),
    {
      onSettled: () =>
        client.invalidateQueries([queryKeys.getWrong(), user?.uid]),
    }
  );
  const result = { wrongs, isLoading, mutateUpdateWrong, mutateRemoveWrong };
  return result;
}
