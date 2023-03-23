export const wait = (delay: number = 100) =>
  new Promise((resolve) => setTimeout(resolve, delay));
