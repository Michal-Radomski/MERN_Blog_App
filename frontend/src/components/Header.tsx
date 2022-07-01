import React from "react";
import {AppBar, Toolbar, Typography, Box, Button, Tabs, Tab} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {authActions, Dispatch, State} from "../redux/store";
import {useStyles} from "./Utils";

const Header = (): JSX.Element => {
  const classes = useStyles();
  const dispatch: Dispatch = useDispatch();

  const isLoggedIn: boolean = useSelector((state: State) => state.isLoggedIn);
  console.log({isLoggedIn});

  const [value, setValue] = React.useState<number>(0);
  // console.log({value});

  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(90deg, rgba(31,19,230,1) 0%, rgba(205,16,85,1) 42%, rgba(77,201,20,1) 59%, rgba(237,0,255,0.95) 100%)",
        }}
      >
        <Toolbar>
          <Typography variant="h4" className={classes.font}>
            MERN BlogApps
          </Typography>
          {/* //* Render Box if isLoggedIn */}
          {isLoggedIn && (
            <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                value={value}
                onChange={(_event, value) => {
                  setValue(value);
                }}
                textColor="inherit"
              >
                <Tab component={Link} to="/blogs" label="All Blogs" style={{fontSize: "105%"}} className={classes.font} />
                <Tab component={Link} to="/myBlogs" label="My Blogs" style={{fontSize: "105%"}} className={classes.font} />
                <Tab component={Link} to="/blogs/add" label="Add Blog" style={{fontSize: "105%"}} className={classes.font} />
              </Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                <Button
                  sx={{margin: 1, borderRadius: 10, backgroundColor: "lightyellow"}}
                  color="info"
                  variant="outlined"
                  component={Link}
                  to="/auth"
                >
                  LogIn
                </Button>
                <Button
                  sx={{margin: 1, borderRadius: 10, backgroundColor: "lightyellow"}}
                  color="info"
                  variant="outlined"
                  component={Link}
                  to="/auth"
                >
                  SignUp
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={() => dispatch(authActions.logout())}
                sx={{margin: 1, borderRadius: 10, backgroundColor: "lightyellow"}}
                color="info"
                variant="outlined"
                component={Link}
                to="/auth"
              >
                LogOut
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
