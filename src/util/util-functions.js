export const generateRandomData = (length) =>
  Array.apply(null, { length: 50 }).map(() => Math.ceil(Math.random() * 500));
