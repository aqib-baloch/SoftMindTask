import * as Yup from "yup";

export const blogSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters"),
  content: Yup.string()
    .required("Conetent is required")
    .min(10, "Content must be at least 10 characters"),
});
