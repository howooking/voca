import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { WrongVoca } from '../models/voca';
import queryKeys from '../utils/queryKeys';
import { getWrongs, removeWrong, updateWrong } from '../api/firebase';

export default function useWrongQuery() {
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
  console.log(wrongs);
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
