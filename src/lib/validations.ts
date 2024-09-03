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

export const answerFormValidation = z.object({
  answer: z.string().min(100, {
    message: "Answer must be at least 100 characters.",
  }),
});

export const profileFormValidation = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters." })
    .max(50, { message: "Name must be no more than 50 characters." }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." })
    .max(20, { message: "Username must be no more than 20 characters." }),
  portfolioWebsite: z.string().url({ message: "Invalid URL" }),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters." })
    .max(50, { message: "Location must be no more than 50 characters." }),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters." })
    .max(150, { message: "Bio must be no more than 150 characters." }),
});
