"use client";

import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { answerFormValidation } from "@/lib/validations";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { AnswerFormProps } from "@/types";
import { usePathname } from "next/navigation";

const AnswerForm = ({ question, questionId, authorId }: AnswerFormProps) => {
  const editorRef = useRef<Editor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mode } = useTheme();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof answerFormValidation>>({
    resolver: zodResolver(answerFormValidation),
    defaultValues: {
      answer: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof answerFormValidation>) {
    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-9">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={() => {}}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="stars"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate AI answer
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue={""}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "paste",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient mt-5 min-h-[46px] w-full rounded-lg !text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Post Answer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
