import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updateBlogById } from "../Redux/Slices/blogSlice";
import { TextField, Button, Typography } from "@mui/material";

const EditBlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { title: initialTitle, content: initialContent } = location.state || {};

  const [title, setTitle] = useState(initialTitle || "");
  const [content, setContent] = useState(initialContent || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { title, content };
    dispatch(updateBlogById({ id, updatedData }));
    navigate("/blog");
  };

  return (
    <div>
      <Typography variant="h4">Edit Blog Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Blog
        </Button>
      </form>
    </div>
  );
};

export default EditBlogPage;
