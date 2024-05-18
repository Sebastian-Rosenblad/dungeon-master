export function generateUniqueId(existingIds: string[]): string {
  let newId: string;
  const generateId = () => `id-${Math.random().toString(36).slice(2, 9)}`;
  do newId = generateId(); while (existingIds.includes(newId));
  return newId;
}
