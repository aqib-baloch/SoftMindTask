import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress } from "@mui/material";
import { getPostById } from "../Redux/Slices/blogSlice";
import { useDispatch } from "react-redux";

const BlogDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        dispatch(getPostById(id))
          .unwrap()
          .then((res) => {
            setPost(res);
            setLoading(false);
          })
          .catch((err) => {
            console.log(" failed:", err);
          });
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load the blog post.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" sx={{ padding: "20px", color: "red" }}>
        {error}
      </Typography>
    );
  }

  if (!post) {
    return (
      <Typography variant="h6" sx={{ padding: "20px" }}>
        Blog not found
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
        {post.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {post.content}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Author: {post.author?.username || "Unknown Author"}{" "}
        {/* Display author name */}
      </Typography>
    </Box>
  );
};

export default BlogDetails;
