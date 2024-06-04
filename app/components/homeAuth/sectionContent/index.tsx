import route from "@/app/api/route";
import { Container, Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SectionContent() {
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    async function fetchUserInfos() {
      try {
        const response = await route.user.getUserInfos();
        if (response.status === 200) {
          setUser({ name: response.data.message.name });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    fetchUserInfos();
  }, []);

  return (
    <div className="bg-slate-800 rounded-sm p-4 flex flex-col justify-center items-start w-auto h-2/3 border-gray-600 border m-auto">
      <Typography
        variant="h2"
        sx={{
          color: "white", // Cor de texto mais escura
          mb: 2,
          animation: "slideInDown 1s ease-in-out",
          fontFamily: "Roboto, sans-serif",
          fontSize: "3rem",
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        Welcome, {user.name}!
      </Typography>
      <Typography
        variant="body1"
        className=""
        sx={{
          color: "white", // Cor de texto mais escura
          mb: 4,
          animation: "slideInUp 1s ease-in-out",
          fontFamily: "Roboto, sans-serif",
          fontSize: "1rem",
          lineHeight: 1.6,
        }}
      >
        Explore our collection of Steam game fan arts and dive into free art
        inspired by your favorite games.
      </Typography>
      <Typography
        fontWeight={"bold"}
        variant="body2"
        sx={{
          color: "white", // Cor de texto mais escura
          animation: "pulse 1s infinite alternate",
          fontFamily: "Roboto, sans-serif",
          fontSize: "1rem",
          lineHeight: 1.4,
        }}
      >
        Don't forget to share your own creations with us!
      </Typography>
      <Box mt={4}>
        <Typography
          variant="body2"
          sx={{ color: "white", mb: 2 }}
          fontWeight={"bold"}
        >
          Share your creations:
        </Typography>
        <Link href="/posts" passHref>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mr: 2,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "black", // Cor de fundo no hover
                color: "white", // Cor do texto no hover
              },
            }}
          >
            Post
          </Button>
        </Link>
        <Typography
          variant="body2"
          sx={{ color: "white", mb: 2 }}
          fontWeight={"bold"}
        >
          Manage your profile:
        </Typography>
        <Link href="/profile" passHref>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              "&:hover": {
                backgroundColor: "black", // Cor de fundo no hover
                color: "#FFFFFF", // Cor do texto no hover
              },
            }}
          >
            Go to Profile
          </Button>
        </Link>
      </Box>
    </div>
  );
}
