import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Blog = ({
  title,
  description,
  imageUrl,
  userName,
}: {
  title: string;
  description: string;
  imageUrl: string;
  userName: string;
}) => {
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
        <CardHeader
          avatar={
            <Avatar sx={{backgroundColor: "blue"}} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component="img" height="194" image={imageUrl} alt={title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
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
