export const rawValueToPercentage = (
  raw: string | number,
  base: number
): number | null => {
  if (typeof raw === 'number' && !Number.isNaN(raw)) {
    return (raw / base) * 100;
  } else if (typeof raw === 'string' && /^[0-9.]+$/.test(raw)) {
    const val = Number(raw);
    return (val / base) * 100;
  } else if (typeof raw === 'string' && /^[0-9.]+%$/.test(raw)) {
    return Number(raw.substring(0, raw.length - 1)) * (base / 100);
  } else if (typeof raw === 'string' && /^[0-9.]+px$/.test(raw)) {
    const val = Number(raw.substring(0, raw.length - 2));
    return (val / base) * 100;
  } else {
    return null;
  }
};
