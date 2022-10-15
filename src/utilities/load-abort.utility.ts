// eslint-disable-next-line import/prefer-default-export
export const loadAbort = () => {
  const controller = new AbortController();
  return controller;
};
