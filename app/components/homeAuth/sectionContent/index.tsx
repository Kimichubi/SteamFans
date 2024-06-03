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
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "400px", // Altura mínima para garantir visibilidade do conteúdo
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        animation: "fadeIn 1s ease-in-out",
        // Animação de fade-in
      }}
    >
      {/* Elemento para imagem de fundo com desfoque */}

      <Container className="bg-gray-900 bg-opacity-20 rounded-lg  p-4">
        <Typography
          variant="h2"
          sx={{
            color: "GrayText", // Cor de texto mais escura
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
            color: "GrayText", // Cor de texto mais escura
            mb: 4,
            animation: "slideInUp 1s ease-in-out",
            fontFamily: "Roboto, sans-serif",
            fontSize: "1.5rem",
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
            color: "#GrayText", // Cor de texto mais escura
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
            sx={{ color: "GrayText", mb: 2 }}
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
                  color: "GrayText", // Cor do texto no hover
                },
              }}
            >
              Post
            </Button>
          </Link>
          <Typography
            variant="body2"
            sx={{ color: "GrayText", mb: 2 }}
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
      </Container>
    </Box>
  );
}
