import { useQuery } from '@tanstack/react-query';
import { Voca } from '../models/voca';
import queryKeys from '../utils/queryKeys';
import { getVocas } from '../api/firebase';

type UseGetVocasReturn = {
  vocas: Voca[] | undefined;
  isLoading: boolean;
};

export default function useGetVocas(): UseGetVocasReturn {
  const { isLoading, data: vocas } = useQuery(queryKeys.getVoca(), getVocas, {
    refetchOnWindowFocus: false,
  });

  return { vocas, isLoading };
}
