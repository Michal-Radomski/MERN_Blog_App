import React from "react";
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const labelStyles = {mb: 1, mt: 1, fontSize: "20px", fontWeight: "bold", backgroundColor: "orange"};

const BlogDetails = (): JSX.Element => {
  const navigate = useNavigate();

  const [blog, setBlog] = React.useState<Blog>();
  // console.log({blog});

  const id = useParams().id;
  // console.log({id});

  const [inputs, setInputs] = React.useState<Blog>({
    title: "",
    description: "",
    image: "",
  });
  // console.log({inputs});

  const handleChange = (event: {target: {name: string; value: string}}) => {
    setInputs((prevState: Blog) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async () => {
    const response = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
      })
      .catch((error) => {
        console.log({error});
      });
    const data: Blog = await response?.data;
    return data;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log({inputs});
    sendRequest()
      // .then((data) => console.log({data}))
      .then(() => navigate("/myBlogs"));
  };

  React.useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err) => {
        console.error({err});
      });
      const data = await response?.data;
      return data;
    };

    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
      });
    });
  }, [id]);

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="green"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection="column"
            width="75%"
          >
            <Typography fontWeight="bold" padding={3} color="gray" variant="h4" textAlign="center">
              Edit This Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField name="title" value={inputs.title} margin="normal" variant="outlined" onChange={handleChange} />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              value={inputs.description}
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            <InputLabel sx={labelStyles}>Image URL</InputLabel>
            <TextField name="image" value={inputs.image} margin="normal" variant="outlined" onChange={handleChange} />
            <Button type="submit" sx={{mt: 2, borderRadius: 4}} variant="contained" color="warning">
              Edit This Blog
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
