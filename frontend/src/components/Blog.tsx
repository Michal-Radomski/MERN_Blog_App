import React from "react";
import {Box, CardHeader, Card, Avatar, CardMedia, CardContent, Typography, IconButton} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {useStyles} from "./Utils";

const Blog = ({
  title,
  description,
  imageUrl,
  userName,
  isUser,
  id,
}: {
  title: string;
  description: string;
  imageUrl: string;
  userName: string;
  isUser: boolean;
  id: string;
}) => {
  // console.log({title, isUser});

  const classes = useStyles();

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    //* const response = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch((error) => {
    const response = await axios.delete(`/api/blog/${id}`).catch((error) => {
      console.log({error});
    });
    const data: Blog = await response?.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then((_data) => {
        // console.log({_data});
      })
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          baxShadow: "5px 5px 10px #ccc",
          "&:hover": {
            backgroundColor: "lightgray",
            baxShadow: "10px 10px 20px #555",
          },
        }}
      >
        {isUser && (
          <Box display="flex" sx={{marginLeft: "auto"}}>
            <IconButton sx={{marginLeft: "auto"}} onClick={handleEdit}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              sx={{backgroundColor: "blue", width: "auto"}}
              aria-label="avatar"
              variant="rounded"
              className={classes.font}
            >
              {userName}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component="img" height="194" image={imageUrl} alt={title} />

        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary" className={classes.font}>
            <b>{userName}</b>
            {": "}
            {description}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Blog;
