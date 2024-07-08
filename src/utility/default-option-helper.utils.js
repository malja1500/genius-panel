export const findDefaultOption = (data, itemId) => {
  const findItem = data.filter((item) => item.value === itemId);

  return findItem[0];
};
