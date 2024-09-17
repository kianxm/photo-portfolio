export function generateImagePaths(
  directory: string,
  fileName: string,
  count: number
) {
  return Array.from({ length: count }, (_, index) => {
    const paddedIndex = (index + 1).toString();
    return `${directory}/${fileName}-${paddedIndex}.jpg`;
  });
}
