import React from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {authActions, Dispatch} from "../redux/store";

const Auth = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const [inputs, setInputs] = React.useState<Person>({
    name: "",
    email: "",
    password: "",
  });

  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);
  console.log({isSignUp});

  const handleChange = (event: {target: {name: string; value: string}}) => {
    setInputs((prevState: Person) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const response = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((error: string) => console.log({error}));

    const data = await response?.data;
    return data;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log({inputs});
    if (isSignUp) {
      sendRequest("signup")
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log({data}));
    } else {
      sendRequest()
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log({data}));
    }
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
              {isSignUp ? "SignUp" : "LogIn"}
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
