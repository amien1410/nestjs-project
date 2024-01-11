import { Logger } from "@nestjs/common";
import { FieldMiddleware, MiddlewareContext, NextFn } from "@nestjs/graphql";

/**
 * Middleware to mask the last three digits of a number in demo mode.
 * @param ctx Middleware context.
 * @param next Next function to proceed to the next middleware or resolver.
 * @returns The original or masked number.
 */
export const numberMasker: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  try {
    let value: number | string = await next();

    // Check if the demo mode is enabled and the value is a number with more than 4 digits.
    const shouldMask = process.env.DEMO_MODE !== null;
    const length = value.toString().length;

    // Apply the mask if conditions are met.
    if (shouldMask && value !== null && length > 4) {
      value = `${value.toString().substring(0, length - 3)}xxxx`;
    }

    return value;
  } catch (error) {
    // Log the error and propagate it.
    Logger.error(`Error in numberMasker middleware: ${error.message}`);
    throw error;
  }
};
