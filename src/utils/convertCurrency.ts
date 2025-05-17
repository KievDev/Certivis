/**
 *  Convert real (BRL) to cents
 * @param {string} amount - Amount in real to be converted
 * @returns {number} - Converted amount in cents
 *
 * @example
 * convertRealToCents("R$ 1300,50") // Returns: 130050 cents
 */
export function convertRealToCents(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, "").replace(",", "."));
  const priceInCents = Math.round(numericPrice * 100);
  return priceInCents;
}
