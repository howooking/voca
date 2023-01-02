export type Voca = {
  id: number;
  eng: string;
  kor: string;
  shownCount: number;
  wrongCount: number;
};

export type WrongVoca = {
  id: number;
  eng: string;
  kor: string;
  shownCount: number;
  wrongCount: number;
  addedDate: number;
  isImportant: boolean;
};
