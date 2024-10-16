import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/signUpSchema";
import image from "../assets/image.jpg";
import GlobalInput from "../components/UI/GlobalInput";
import { registerUser } from "../Redux/Slices/blogSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupError, setSignupError] = React.useState(null);

  const { handleChange, handleBlur, handleSubmit, touched, values, errors } =
    useFormik({
      initialValues: { username: "", password: "", role: "" },
      validationSchema: signupSchema,
      onSubmit: async (values, actions) => {
        console.log("Submitting form with values:", values);
        try {
          setSignupError(null);

          const response = await dispatch(registerUser(values)).unwrap();

          if (response) {
            console.log("Registration successful:", response);
            navigate("/");
          }
        } catch (err) {
          console.error("Error signing up:", err);
          setSignupError("Registration failed. Please try again."); // Set error message for UI
        }
      },
    });

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{ maxWidth: "80%", maxHeight: "100%", borderRadius: 3, padding: 0 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box sx={{ padding: 4 }}>
              {signupError && (
                <Typography variant="body1" sx={{ color: "error.main" }}>
                  {signupError}
                </Typography>
              )}
              <Box sx={{ marginBottom: 1 }}>
                <Typography variant="h5" fontWeight="bold">
                  Welcome!
                </Typography>
                <Typography variant="h6">To the Blog Web App</Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <GlobalInput
                  name="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange} // Make sure this matches your input component's prop
                  onBlur={handleBlur} // Ensure this matches your input component's prop
                  values={values}
                  helperText={
                    touched.username && errors.username ? errors.username : null
                  }
                  autoComplete="username"
                />

                <GlobalInput
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange} // Make sure this matches your input component's prop
                  onBlur={handleBlur} // Ensure this matches your input component's prop
                  values={values}
                  helperText={
                    touched.password && errors.password ? errors.password : null
                  }
                  autoComplete="current-password"
                />

                {/* Role Dropdown */}
                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">Role</Typography>
                  <select
                    name="role"
                    value={values.role}
                    onChange={handleChange} // Ensure this is correct
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    <option value="" label="Select role" />
                    <option value="user" label="User" />
                    <option value="admin" label="Admin" />
                  </select>
                  {touched.role && errors.role && (
                    <Typography variant="body2" sx={{ color: "error.main" }}>
                      {errors.role}
                    </Typography>
                  )}
                </Box>

                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  padding: 0,
                }}
              >
                <Typography style={{ fontSize: "15px" }}>
                  Already Have An Account?
                </Typography>
                <a
                  href="/"
                  style={{
                    fontSize: "15px",
                    marginLeft: "5px",
                    cursor: "pointer",
                  }}
                >
                  Login Now
                </a>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <img
              src={image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderTopRightRadius: "10px", // Adjust the value as needed
                borderBottomRightRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignUp;
