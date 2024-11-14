/**
 * Custom error class for invalid arguments.
 *
 * This error is thrown when a function or method receives an argument
 * that is invalid or inappropriate.
 */
export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidArgumentError";
  }
}
