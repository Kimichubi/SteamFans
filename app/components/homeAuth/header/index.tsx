import route from "@/app/api/route";
import { Button, Input, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function HeaderAuth() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    async function FetchUserInfos() {
      try {
        const response = await route.user.getUserInfos();
        if (response.status === 200) {
          setUser({ name: response.data.message.name });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    FetchUserInfos();
  }, []);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav className="w-full h-32 flex justify-between items-center p-6 bg-gradient-to-br from-slate-600 to-slate-800">
        <div className="flex items-center gap-2">
          <Link href={"/home"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3em"
              height="3em"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white"
            >
              <path d="M8.21 17.32L7 16.8a2.13 2.13 0 1 0 1.17-2.93l1.28.53a1.58 1.58 0 0 1-1.22 2.92z" />
              <path d="M12 2a10 10 0 0 0-10 9.34l5.38 2.21a2.31 2.31 0 0 1 .47-.24A2.62 2.62 0 0 1 9 13.1l2.44-3.56a3.8 3.8 0 1 1 3.8 3.8h-.08l-3.51 2.5a2.77 2.77 0 0 1-5.47.68l-3.77-1.6A10 10 0 1 0 12 2" />
              <path d="M17.79 9.5a2.53 2.53 0 1 0-2.53 2.5a2.54 2.54 0 0 0 2.53-2.5m-4.42 0a1.9 1.9 0 1 1 1.9 1.91a1.9 1.9 0 0 1-1.9-1.92z" />
            </svg>
          </Link>
          <Typography className="font-bold text-white">
            Bem vindo {user.name}
          </Typography>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button className="text-white">
            <Link href={"/posts"}>
              Post
              <svg
                className="w-6 h-6 text-white ml-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                />
              </svg>
            </Link>
          </Button>
          <Button className="text-white">
            <Link href={"/profile"}>
              Profile
              <svg
                className="w-6 h-6 text-white ml-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </Button>
          <Input type="text" className="text-white" placeholder="Search" />
          <Button className="text-white">
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <IconButton
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className="text-white"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="mobile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "more-button",
              onMouseDown: (e) => e.stopPropagation(), // prevents menu from closing on click
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link href="/posts">Post</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/profile">Profile</Link>
            </MenuItem>
            <MenuItem>
              <Input type="text" placeholder="Search" />
              <Button>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </>
  );
}
