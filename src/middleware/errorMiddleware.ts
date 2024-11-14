import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import { InvalidArgumentError } from "../utils/errors";

/**
 * Express middleware function for handling errors.
 *
 * This middleware catches and handles different types of errors:
 * - `ValidateError`: Validation errors from `tsoa`, typically caused by invalid request data.
 * - `InvalidArgumentError`: Errors caused by invalid user input.
 * - `Error`:  General errors, likely indicating server-side issues.
 *
 * @param err The error object thrown.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The Express next function.
 */
export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      name: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof InvalidArgumentError) {
    console.error(`${err.name}: ${err.message}`);
    return res.status(400).json({
      name: err.name,
      details: err.message,
    });
  }

  if (err instanceof Error) {
    console.error(err);
    return res.status(500).json({
      name: err.name,
      details: err.message,
    });
  }

  next();
};
