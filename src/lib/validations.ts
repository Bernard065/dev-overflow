import { z } from "zod";

export const questionFormValidation = z.object({
  questionTitle: z
    .string()
    .min(5, { message: "Question title must be at least 5 characters." })
    .max(150, {
      message: "Question title must be no more than 150 characters.",
    }),
  explanation: z
    .string()
    .min(100, { message: "Explanation must be more than 100 characters" }),
  tags: z
    .array(
      z
        .string()
        .min(2, { message: "Tag must have a minimum of 2 characters" })
        .max(20, { message: "Tag must have a maximum of 20 characters" })
    )
    .min(1, { message: "Minimum of 1 tag" })
    .max(5, { message: "Maximum of 5 tags" }),
});
