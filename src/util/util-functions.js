export const getRandomNumber = (min = 100, max = 500) => {
  const num = Math.random() * (max - min) + min;
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const generateRandomData = (length) =>
  Array.apply(null, { length }).map(() => getRandomNumber());
