export async function runInChunks<T, U>(
  values: T[],
  fn: (chunk: T[]) => U | Promise<U>,
  chunkSize = 1000,
): Promise<U extends unknown[] ? U : U[]> {
  const results = [];

  for (let i = 0; i < values.length; i += chunkSize) {
    const result = await fn(values.slice(i, i + chunkSize));

    Array.isArray(result) ? results.push(...result) : results.push(result);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return results as any;
}
