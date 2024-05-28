import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import "./styles.css";
import Image from "next/image";

export default function HeaderNoAuth() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} minWidth={"100%"}>
        <AppBar position="static" className="appBar">
          <Toolbar className="bg-slate-950 tollBar">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              className="iconBtn"
            >
              <Image
                className="imgIcon"
                src="/steamIcon.jpg"
                width={40}
                height={40}
                alt="icon"
              ></Image>
            </IconButton>

            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
              className="typography"
            >
              Welcome to steam fans arts
            </Typography>
            <Button className="button" color="inherit">
              Login
            </Button>
            <Button className="button" color="inherit">
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
