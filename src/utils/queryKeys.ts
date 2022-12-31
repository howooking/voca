const enum Keys {
  vocas = 'vocas',
  wrongs = 'wrongs',
}
const queryKeys = {
  getVoca: () => [Keys.vocas] as const,
  getWrong: () => [Keys.wrongs] as const,
};
export default queryKeys;
