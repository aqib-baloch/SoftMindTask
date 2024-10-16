import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Box, Button, Grid, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewAllPosts } from "../Redux/Slices/blogSlice";

const BlogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.blogSlice);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    dispatch(viewAllPosts());

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded JWT Token:", decodedToken);

      if (decodedToken.user && decodedToken.user.role) {
        setIsAdmin(decodedToken.user.role === "admin");
        console.log("Is Admin:", decodedToken.user.role === "admin");
      } else {
        console.error("Role is not defined in the decoded token.");
      }
    }
  }, [dispatch]);

  return (
    <div className={`${styles.cardContainer}`}>
      <Typography
        variant="h2"
        sx={{ padding: "20px", margin: "50px", fontWeight: "bold" }}
      >
        Your Daily Blogs
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {isAdmin && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/createBlog")}
            sx={{ marginBottom: "10px", maxHeight: "35px" }}
          >
            Create Blog
          </Button>
        )}
      </Box>

      {loading ? (
        <Typography variant="body1" sx={{ padding: "20px" }}>
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="body1" sx={{ padding: "20px", color: "red" }}>
          {error}
        </Typography>
      ) : posts.length > 0 ? (
        <Grid container spacing={1}>
          {posts.map((blog) => (
            <Grid item key={blog._id} xs={12} sm={6} md={3}>
              <BlogCard
                title={blog.title}
                content={blog.content}
                author={blog.author?.username || "Unknown Author"}
                id={blog._id}
                isAdmin={isAdmin}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ padding: "20px" }}>
          No posts available.
        </Typography>
      )}
    </div>
  );
};

export default BlogPage;
