import { useEffect, useState } from "react";
import SlideShow from "../../commons/carousel";

import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material"; // Adicionando CircularProgress para o loading
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "./style.css";
import postService from "@/app/api/services/postsService";

export default function RecentPosts({ text }: any) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o loading

  useEffect(() => {
    const getRecentlyPosts = async () => {
      const response = await postService.favoritedPosts();

      if (response.status === 200) {
        console.log(response.data.message);
        setPosts(response.data.message);
        setLoading(false); // Alterando o estado para indicar que as imagens foram carregadas
        return;
      }
    };
    getRecentlyPosts();
  }, []);

  return (
    <Box className="containerRepeatImgFavorited">
      <Box
        className="flex flex-col items-center gap-6 h-full p-8 rounded-lg relative"
        style={{ margin: "auto" }}
      >
        {loading && ( // Mostrando o CircularProgress enquanto as imagens estão sendo carregadas
          <CircularProgress
            style={{ position: "absolute", top: "50%", left: "50%" }}
          />
        )}
        <Box
          className="absolute top-0 left-0 w-full h-full bg-white opacity-10 rounded-lg"
          style={{ zIndex: -1 }}
        />
        <Typography
          className="text-5xl font-bold text-white text-center mb-2 relative"
          style={{
            fontFamily: "'Roboto', sans-serif",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }} // Adicionando uma sombra ao texto
        >
          {text}
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: "50%",
              bottom: "-10px",
              width: "100px",
              height: "4px",
              backgroundColor: "#00bfa5",
              transform: "translateX(-50%)",
              borderRadius: "2px",
            }}
          />
        </Typography>
        <Typography
          className="text-lg text-white  text-center mb-6 relative"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Here are the recent posts!
        </Typography>
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12}>
            {!loading && ( // Renderizando o SlideShow apenas quando as imagens estiverem carregadas
              <SlideShow posts={posts} />
            )}
          </Grid>
        </Grid>
        <Box className="flex justify-center mt-6 space-x-8 bg-gray-200 bg-opacity-20 rounded-lg pointer-events-none">
          <Box className="flex items-center space-x-2">
            <ThumbUpIcon style={{ color: "#00bfa5" }} />
            <Typography className="text-lg text-white font-semibold">
              Likes
            </Typography>
          </Box>
          <Box className="flex items-center space-x-2 ">
            <FavoriteIcon style={{ color: "#e57373" }} />
            <Typography className="text-lg text-white font-semibold">
              Favorites
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
