import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string()
    .min(2, "Username must be at least 2 characters long")
    .required("Please enter your username"),
    
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one alphabet and one number"
    )
    .required("Please enter your password"),
});
