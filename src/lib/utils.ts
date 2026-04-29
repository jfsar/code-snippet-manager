export function generateUsername(fullName: string) {
  const base = fullName.toLowerCase().replace(/\s+/g, "");

  const array = new Uint32Array(1);
  crypto.getRandomValues(array);

  return `${base}${array[0].toString(36).slice(0, 5)}`;
}

export const PER_PAGE = 3;
