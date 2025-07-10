export function containsSpaces(input) {
  const hasSpace = /\s/.test(input); // Checks for any whitespace
  return hasSpace;
};

export function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};