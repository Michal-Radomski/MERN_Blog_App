import React from "react";
import {AppBar, Toolbar, Typography, Box, Button} from "@mui/material";

const Header = () => {
  return (
    <React.Fragment>
      <AppBar
        sx={{
          background:
            "linear-gradient(90deg, rgba(31,19,230,1) 0%, rgba(205,16,85,1) 42%, rgba(77,201,20,1) 59%, rgba(237,0,255,0.95) 100%)",
        }}
      >
        <Toolbar>
          <Typography variant="h4">MERN BlogApps</Typography>
          <Box display="flex" marginLeft="auto">
            <Button sx={{margin: 1, borderRadius: 10, backgroundColor: "lightyellow"}} color="info" variant="outlined">
              LogIn
            </Button>
            <Button sx={{margin: 1, borderRadius: 10, backgroundColor: "lightyellow"}} color="info" variant="outlined">
              SignUp
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
