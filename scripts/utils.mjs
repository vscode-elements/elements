export const camelize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const kebabToPascal = (kebab) => {
  const parts = kebab.split('-');

  return parts.reduce(
    (prevVal, currentVal) => prevVal + camelize(currentVal),
    ''
  );
};
