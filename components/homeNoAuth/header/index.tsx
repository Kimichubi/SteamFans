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
import Link from "next/link";

export default function HeaderNoAuth() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} minWidth={"100%"}>
        <AppBar position="static" className="appBar">
          <Toolbar className="bg-slate-950 tollBar">
            <Link href="/">
              {" "}
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
            </Link>

            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
              className="typography"
            >
              Welcome to steam fans arts
            </Typography>
            <Link href="/login">
              {" "}
              <Button className="button" color="inherit">
                Login
              </Button>
            </Link>

            <Link href="/register">
              {" "}
              <Button className="button" color="inherit">
                Register
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
