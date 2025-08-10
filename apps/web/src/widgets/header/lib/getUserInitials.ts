export const getUserInitials = (name: string, max = 2): string => {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, max)
    .toUpperCase()
}
