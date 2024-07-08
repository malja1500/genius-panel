export const persianNumberFormatter = (number) => {
  const formatNumber = new Intl.NumberFormat("fa-IR", {
    notation: "compact",
  });

  return formatNumber.format(number) + " تومان";
};
