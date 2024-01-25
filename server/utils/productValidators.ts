// Validates product price
export const validatePrice = (price: number): boolean => {
  const minPrice = 0.01; // Consider using a minimum price greater than 0 to avoid free products
  return price >= minPrice;
};