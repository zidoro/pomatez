export const oneOrMany = (count: number, unit: string) => {
  const unitValue = count > 1 ? `${unit}s` : unit;

  return `${count} ${unitValue}`;
};
