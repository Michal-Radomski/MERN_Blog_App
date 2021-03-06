import React from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {authActions, Dispatch} from "../redux/store";

const Auth = ({isSignUp, setIsSignUp}: {isSignUp: boolean; setIsSignUp: (arg0: boolean) => void}): JSX.Element => {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const [inputs, setInputs] = React.useState<Person>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: {target: {name: string; value: string}}) => {
    setInputs((prevState: Person) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const response = await axios
      //* .post(`http://localhost:5000/api/user/${type}`, {
      .post(`/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((error: {message: string}) => {
        console.log({error});
        alert(error.message + "\n \nBad login or/and password...");
      });

    const data = await response?.data;
    return data;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log({inputs});
    if (isSignUp) {
      sendRequest("signup")
        //* First version
        // .then((data) => localStorage.setItem("userId", data.user._id))
        // .then(() => dispatch(authActions.login()))
        // .then(() => navigate("/blogs"));
        // .then((data) => console.log({data}));
        //* Second version
        // .then((data) => console.log({data}))
        .then(() => alert("You will be automatically logged out \n Please log in..."))
        .then(() => dispatch(authActions.logout()))
        .then(() => navigate("/"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
      // .then((data) => console.log({data}));
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
            <Button
              sx={{borderRadius: 3, marginTop: 3}}
              color={!isSignUp ? "success" : "warning"}
              variant="contained"
              type="submit"
            >
              {!isSignUp ? "LogIn" : "SignUp"}
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
