import React from "react";
import {AppBar, Toolbar, Typography, Box, Button, Tabs, Tab} from "@mui/material";
import {Link} from "react-router-dom";

const Header = () => {
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
          <Typography variant="h4">MERN BlogApps</Typography>
          <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
            <Tabs
              value={value}
              onChange={(_event, value) => {
                setValue(value);
              }}
              textColor="inherit"
            >
              <Tab component={Link} to="/blogs" label="All Blogs" style={{fontSize: "105%"}} />
              <Tab component={Link} to="/myBlogs" label="My Blogs" style={{fontSize: "105%"}} />
            </Tabs>
          </Box>
          <Box display="flex" marginLeft="auto">
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
            <Button
              sx={{margin: 1, borderRadius: 10, backgroundColor: "lightyellow"}}
              color="info"
              variant="outlined"
              component={Link}
              to="/auth"
            >
              LogOut
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
