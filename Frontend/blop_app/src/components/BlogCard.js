import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteBlogById } from "../Redux/Slices/blogSlice";

const BlogCard = ({ title, content, author, id, isAdmin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteBlogById(id));
  };

  const handleEdit = () => {
    navigate(`/editBlog/${id}`, {
      state: {
        title: title,
        content: content,
      },
    });
  };
  return (
    <Card
      sx={{
        minWidth: 330,
        maxWidth: 420,
        minHeight: 270,
        maxHeight: 370,
        margin: "20px 10px",
        position: "relative",
      }}
    >
      <CardContent>
        <Typography sx={{ mb: 3 }} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 3 }} variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Typography sx={{ mb: 3 }} variant="body2" color="text.secondary">
          Author: {author}
        </Typography>

        {isAdmin && (
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            <IconButton color="primary" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </CardContent>

      <Link to={`/blogDetails/${id}`}>
        <Button
          size="small"
          color="primary"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 3,
            fontSize: "15px",
            margin: "10px",
          }}
        >
          Read More...
        </Button>
      </Link>
    </Card>
  );
};

export default BlogCard;
