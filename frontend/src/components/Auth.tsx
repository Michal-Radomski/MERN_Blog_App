import React from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import axios from "axios";

const Auth = () => {
  const [inputs, setInputs] = React.useState<Person>({
    name: "",
    email: "",
    password: "",
  });

  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);
  // console.log({isSignUp});

  const handleChange = (event: {target: {name: string; value: string}}) => {
    setInputs((prevState: Person) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // const sendRequest = async()=>{
  //   axios.post("")
  // }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log({inputs});
  };

  return (
    <React.Fragment>
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            boxShadow={"10px 10px 20px #ccc"}
            padding={3}
            margin={"auto"}
            marginTop={5}
            borderRadius={5}
            maxWidth={"40%"}
            sx={{
              backgroundColor: "inherit",
              "&:hover": {
                // backgroundColor: "whitesmoke",
                backgroundColor: isSignUp ? "lightcyan" : "lightgreen",
              },
            }}
          >
            <Typography padding={3} textAlign={"center"} variant="h3">
              {isSignUp ? "LogIn" : "SignUp"}
            </Typography>
            {isSignUp && (
              <TextField
                margin="normal"
                placeholder="Name"
                type="text"
                value={inputs.name}
                onChange={handleChange}
                name="name"
              />
            )}
            <TextField
              margin="normal"
              placeholder="Email"
              type="email"
              value={inputs.email}
              onChange={handleChange}
              name="email"
            />
            <TextField
              margin="normal"
              placeholder="Password"
              type="password"
              value={inputs.password}
              onChange={handleChange}
              name="password"
              InputProps={{inputProps: {minLength: 8, maxLength: 20}}}
            />
            <Button sx={{borderRadius: 3, marginTop: 3}} color="warning" variant="contained" type="submit">
              Submit
            </Button>
            <Button sx={{borderRadius: 3, marginTop: 3}} color="info" onClick={() => setIsSignUp(!isSignUp)} type="button">
              Change To {isSignUp ? "LogIn" : "SignUp"}
            </Button>
          </Box>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Auth;
