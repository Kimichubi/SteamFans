"use client";
import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css";
import SlideShow from "@/components/commons/carousel";
import postService from "@/app/api/services/postsService";
export default function SectionContent({ text }: any) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await postService.fetchPosts();
        console.log(response);
        //  @ts-ignore
        setPosts(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        if (error) {
          console.error(error);
          return;
        }
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Container className="flex justify-center items-center flex-col gap-5 min-w-full h-full  p-6 rounded-lg ">
        <Typography className="text-4xl text-white text-center mb-4 font-bold">
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
