import React from "react";
import axios from "axios";
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";

const labelStyles = {mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold"};

const AddBlog = (): JSX.Element => {
  const [inputs, setInputs] = React.useState<Blog>({
    title: "",
    description: "",
    image: "",
  });
  // console.log({inputs});

  const sendRequest = async () => {
    const response = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((error) => console.error({error}));
    const data = await response?.data;
    // console.log({data});
    return data;
  };

  const handleChange = (event: {target: {name: string; value: string}}) => {
    setInputs((prevState: Blog) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log({inputs});
    sendRequest().then((response) => console.log({response}));
  };

  return (
    <div>
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
          <Typography fontWeight="bold" padding={3} color="gray" variant="h3" textAlign="center">
            Post Your Blog
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
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
