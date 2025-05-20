export const parsePrice = (price) => {
  const num = typeof price === 'string'
    ? Number(price.replace(/[^0-9.-]+/g, ""))
    : Number(price);
  return isNaN(num) ? 0 : num;
};