import { useEffect, useState } from "react";
import SlideShow from "../../commons/carousel";
import route from "@/app/api/route";
import { Container, Grid, Typography } from "@mui/material";

export default function RecentPosts({ text }: any) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getRecentlyPosts = async () => {
      const response = await route.posts.recentlyPosts();

      if (response.status === 200) {
        console.log(response.data.message);
        setPosts(response.data.message);
        return;
      }
    };
    getRecentlyPosts();
   
  }, []);

  return (
    <>
      <Container className="flex justify-center items-center flex-col gap-5 min-w-full h-full  p-6 rounded-lg ">
        <Typography className="text-4xl text-black text-center mb-4 font-bold">
          {text}
        </Typography>
        <Grid container justifyContent="center">
          <Grid item>
            <SlideShow posts={posts}></SlideShow>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
