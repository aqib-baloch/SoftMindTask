// CreateBlogForm.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import GlobalInput from "../components/UI/GlobalInput";
import GlobalButton from "../components/UI/GlobalButton";
import { blogSchema } from "../schemas/blogSchema";  
import { useDispatch } from "react-redux";  
import { createBlog } from "../Redux/Slices/blogSlice";  

const CreateBlogForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  

 
  const initialValues = {
    title: "",
    content: "",
  };

  const { handleChange, handleBlur, handleSubmit, touched, values, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: blogSchema,
      onSubmit: async (values, actions) => {
        console.log("Form submitted with values:", values);  
        try {
           
          await dispatch(createBlog(values)).unwrap();  
          console.log("Blog created successfully!");  
          actions.resetForm();  
          navigate("/blog");  
        } catch (error) {
          console.error("Failed to create blog:", error);  
        }
      },
    });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", sm: "400px" },
          padding: 3,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" paddingBottom={2}>
          Create Blog
        </Typography>

        <form onSubmit={handleSubmit}>
          <GlobalInput
            name="title"
            label="Blog Title"
            type="text"
            value={values.title}
            onChange={handleChange} // Updated
            onBlur={handleBlur} // Updated
            values={values}
            helperText={touched.title && errors.title ? errors.title : null}
          />

          <GlobalInput
            name="content"
            label="Content"
            type="text"
            value={values.content}
            onChange={handleChange}  
            onBlur={handleBlur} 
            values={values}
            helperText={
              touched.content && errors.content ? errors.content : null
            }
            multiline
            rows={4}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: 3,
            }}
          >
            <GlobalButton
              variant="contained"
              color="success"
              title="Create Blog"
              type="submit"  
              fullWidth
            />

            <GlobalButton
              variant="contained"
              color="secondary"
              title="Cancel"
              onClick={() => navigate("/blog")}
              fullWidth
            />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateBlogForm;
