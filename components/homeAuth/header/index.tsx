import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Mudança de next/navigation para next/router
import {
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Input,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";

import CategorysToSearch from "../../categorysSearch";
import userService from "@/app/api/services/userService";
import categoryService from "@/app/api/services/categoryService";

interface Categorys {
  id: number;
  name: string;
  imageUrl: string;
  _count: {
    favorites: number;
    likes: number;
    followers: number;
  };
}

export default function HeaderAuth() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const [page, setPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState([]);
  const [categorys, setCategorys] = useState<Categorys[]>([]);
  useEffect(() => {
    async function fetchUserInfos() {
      // Alteração de FetchUserInfos para fetchUserInfos (convenção camelCase)
      try {
        const response = await userService.getUserInfos();

        if (response.status === 200) {
          setUser({ name: response.data.message.name });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    fetchUserInfos();
  }, []);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const searchCategorys = async (ev: any) => {
    const response = await categoryService.categorySearch(searchParams, page);
    if (response.status === 200) {
      setCategorys(response.data.message);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("steam-token");
    router.push("/");
  };

  return (
    <>
      <Box
        className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-600 to-slate-800"
        style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
      >
        <Link href={"/home"}>
          <Typography
            className="font-bold text-white cursor-pointer"
            variant="h6"
          >
            FanArt Gallery
          </Typography>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {" "}
            {/* Alteração de hidden para md:hidden para exibição em dispositivos menores */}
            <Link href={"/posts"}>
              <Button className="text-white">Posts</Button>
            </Link>
            <Link href={"/profile"}>
              <Button className="text-white">Profile</Button>
            </Link>
            <Input
              color="secondary"
              className="text-white"
              type="text"
              placeholder="Search"
              onChange={(ev) => {
                setSearchParams(ev.currentTarget.value);
              }}
            />
            <Button
              onClick={(ev) => {
                searchCategorys(ev);
              }}
            >
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
            {" "}
            {/* Adição de md:hidden para exibição em dispositivos menores */}
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
            >
              {" "}
              <Link href="/posts">
                {" "}
                <MenuItem>Posts</MenuItem>
              </Link>
              <Link href="/profile">
                {" "}
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuItem>
                <Input
                  type="text"
                  placeholder="Search"
                  onChange={(ev) => {
                    setSearchParams(ev.currentTarget.value);
                  }}
                />
                <Button
                  onClick={(ev) => {
                    searchCategorys(ev);
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
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
          {/* <div>
          <IconButton onClick={handleDarkModeChange} className="text-white">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div> */}
          <div>
            <Button onClick={handleLogout} className="text-white">
              Logout
            </Button>
          </div>
        </div>
      </Box>
      <CategorysToSearch
        searchValue={searchParams}
        categoriasToPut={categorys}
      />
    </>
  );
}
