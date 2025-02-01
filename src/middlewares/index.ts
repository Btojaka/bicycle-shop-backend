import { validationResult } from "express-validator";
import colors from "colors";
import { Request, Response, NextFunction } from "express";

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(colors.bgYellow("Middleware executed: handleInputErrors"));
  console.log(colors.bgCyan(`Body data: ${JSON.stringify(req.body)}`));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(
      colors.bgRed(`Validation errors: ${JSON.stringify(errors.array())}`)
    );
    res.status(400).json({ errors: errors.array() }); // return error response
    return; // stop the execution of the middleware
  }

  next(); // if there are no errors, continue to the next middleware
};
