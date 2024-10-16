import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import GlobalInput from "../components/UI/GlobalInput";
import GlobalButton from "../components/UI/GlobalButton";
import { loginSchema } from "../schemas/loginSchema";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Slices/blogSlice";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = React.useState(null);

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSignUp = () => {
    navigate("/signUp");
  };

  const { handleChange, handleBlur, handleSubmit, touched, values, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          setLoginError(null);

          console.log("Form values on submission:", values);

          const response = await dispatch(loginUser(values)).unwrap();
          console.log("Login successful:", response);

          toast.success("Login successful!");
          navigate("/blog");
        } catch (err) {
          console.error("Login failed:", err);
          setLoginError(
            err || "Login failed. Please check your credentials and try again."
          );
        }
      },
    });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Box
        sx={{
          width: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
          padding: 2,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="fontWeightBold" padding={3}>
          Login Page
        </Typography>
        {loginError && <Typography color="error">{loginError}</Typography>}
        <form onSubmit={handleSubmit}>
          <GlobalInput
            name="username"
            label="Username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            helperText={
              touched.username && errors.username ? errors.username : null
            }
          />
          <GlobalInput
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />

          <Box sx={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <Button type="submit" variant="contained" color="primary">
              Log In
            </Button>

            <GlobalButton
              variant="contained"
              color="secondary"
              title="Sign Up"
              onClick={handleSignUp}
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
