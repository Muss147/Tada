import { createAction } from "next-safe-action";
import type { z } from "zod";

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (data: TInput) => Promise<TOutput>,
) => {
  return createAction(schema, handler);
};
