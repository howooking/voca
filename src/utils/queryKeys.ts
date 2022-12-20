const enum Keys {
  voca = 'voca',
}
const queryKeys = {
  getVoca: () => [Keys.voca] as const,
};
export default queryKeys;
