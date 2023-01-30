export function formatCount(rawCount) {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(rawCount);
}

export function addNoise(number) {
  return formatCount(number * (1 + Math.random()) * 0.1);
}
