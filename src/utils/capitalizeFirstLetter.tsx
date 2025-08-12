export const capitalizeFirstLetter = (s: string) => {
  if (s.length === 0) {
    return s;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const upperSplit = (s: string) => s
  .replace(/([A-Z][a-z])/g, " $1")
  .replace(/([A-Z])([A-Z])/g, "$1 $2")
  .replace(/([0-9])([A-Z])/g, "$1 $2")
  .trim();