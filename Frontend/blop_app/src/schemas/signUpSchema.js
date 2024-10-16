import * as Yup from "yup";

const roles = ["user", "admin"];

export const signupSchema = Yup.object({
  username: Yup.string()
    .min(2, "Username must be at least 2 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .required("Please enter your username"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one alphabet and one number"
    )
    .required("Please enter your password"),

  role: Yup.string()
    .oneOf(roles, "Role must be either 'user' or 'admin'")
    .required("Please select a role"),
});
