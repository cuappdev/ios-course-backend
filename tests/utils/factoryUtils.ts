/**
 * Utility class for creating arrays of objects.
 */
class FactoryUtils {
  /**
   * Creates an array of objects by repeatedly calling a factory function.
   *
   * @param n The number of objects to create.
   * @param fn The factory function that creates a single object.
   * @returns An array containing `n` objects created by the factory function.
   *
   * @example
   * // Create an array of 5 users
   * const users = FactoryUtils.create(5, () => ({ name: 'Vin Bui', age: 21 }));
   */
  public static create<T>(n: number, fn: () => T): T[] {
    return Array(n).fill(null).map(fn);
  }
}

export default FactoryUtils;
