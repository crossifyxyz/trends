export function formatAmountString(input: string): string {
  // Remove any leading zeros
  let sanitizedInput = input.replace(/^0+(?=[1-9])/g, '')
  // Replace commas with periods
  sanitizedInput = sanitizedInput.replace(/,/g, '.')
  // Replace all characters except numbers, commas, and periods with an empty string
  sanitizedInput = sanitizedInput.replace(/[^\d.,]/g, '')
  // Replace any duplicate periods with a single period
  sanitizedInput = sanitizedInput.replace(/\.+/g, '.')
  // Add a leading zero if the input starts with a decimal point
  if (/^\./.test(sanitizedInput)) sanitizedInput = `0${sanitizedInput}`
  // Don't start with a point or comma
  if (/^[.,]/.test(sanitizedInput)) sanitizedInput = `0${sanitizedInput}`
  // Ensure that only one period or comma is present in the output string
  const [integerPart, fractionalPart] = sanitizedInput.split('.')
  if (fractionalPart)
    sanitizedInput = `${integerPart}.${fractionalPart.replace(/[\.,]/g, '')}`
  return sanitizedInput
}

export function convertToInternationalCurrencySystem(
  value: string | number | undefined
) {
  // Nine Zeroes for Billions
  return Math.abs(Number(value)) >= 1.0e9
    ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B'
    : // Six Zeroes for Millions
      Math.abs(Number(value)) >= 1.0e6
      ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M'
      : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K'
        : (() => {
            const last = Math.abs(Number(value)).toFixed(5)
            if (last === '0.00000') return '...'
            return last
          })()
}

export const getCoinIdFromName = (name: string) =>
  name.toLowerCase().replace(/ /g, '-')
