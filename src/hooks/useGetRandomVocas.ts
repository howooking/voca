import { useQuery } from '@tanstack/react-query';
import { VocaInfo } from '../models/voca';
import getVocas from '../api/firebase';
import queryKeys from '../utils/queryKeys';

type UseGetRandomVocasReturnType = {
  randomVocas: VocaInfo[];
  isLoading: boolean;
  isError: boolean;
};

const useGetRandomVocas = (numOfVocas: number): UseGetRandomVocasReturnType => {
  const {
    isLoading,
    isError,
    data: vocas,
  } = useQuery(queryKeys.getVoca(), getVocas, {
    staleTime: 1000 * 60 * 60,
  });
  const randomVocas = [];
  for (let i = 0; i < numOfVocas; i += 1) {
    const chosenVoca =
      vocas && vocas[Math.floor(Math.random() * vocas.length) + 1];
    randomVocas.push(chosenVoca);
  }
  return { randomVocas, isLoading, isError };
};

export default useGetRandomVocas;
