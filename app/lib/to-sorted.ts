export function toSorted<T>(input: T[], compare: (a: T, b: T) => number): T[] {
  return input.slice().sort(compare)
}
