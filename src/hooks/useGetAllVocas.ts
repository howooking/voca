import { useQuery } from '@tanstack/react-query';
import { Voca } from '../models/voca';
import getVocas from '../api/firebase';
import queryKeys from '../utils/queryKeys';

type UseGetRandomVocasReturnType = {
  vocas: Voca[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export default function useGetAllVocas(): UseGetRandomVocasReturnType {
  const {
    isLoading,
    isError,
    data: vocas,
  } = useQuery(queryKeys.getVoca(), getVocas, {
    staleTime: 1000 * 60 * 60,
  });

  return { vocas, isLoading, isError };
}
