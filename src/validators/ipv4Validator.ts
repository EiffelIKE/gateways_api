export const ipv4Validator = (value: string) => {
  const pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = value.match(pattern);
  if (!match) return false;
  return match.slice(1).every((octet: string) => parseInt(octet, 10) <= 255);
};
