"use client";

import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css";
import SlideShow from "@/app/components/commons/carousel";
import route from "@/app/api/route";

export default function SectionContent({ text }: any) {
  const [posts, setPosts] = useState([]);

  const hardCodedPostsToTest = [
    {
      id: 1,
      name: "Akamaihd",
      fanArtUrl:
        "https://steamuserimages-a.akamaihd.net/ugc/781854100511555950/965B7BACEE3525578C7A812798E8565B9DEB755C/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      author: {
        name: "Gabriel",
      },
    },
    {
      id: 2,
      name: "Test2",
      fanArtUrl:
        "https://steamuserimages-a.akamaihd.net/ugc/261590659825233576/D3E493848FD29C863C6FA992A16471ED6574B19F/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      author: {
        name: "User2",
      },
    },
    {
      id: 3,
      name: "Cloud",
      fanArtUrl:
        "https://clan.cloudflare.steamstatic.com/images//8729288/d28199514d22f3469d62f1b1e233156318f2a5b9.jpg",
      author: {
        name: "User3",
      },
    },
    {
      id: 4,
      name: "Cloud",
      fanArtUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyjIjspTbev5qae8O7LewAYmj66KzHl-nHMw&s",
      author: {
        name: "User3",
      },
    },
    {
      id: 5,
      name: "Cloud",
      fanArtUrl:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b769aa5e-6eaa-45da-bd47-6c409802ac7d/da1h8bd-b12f1e43-a2c7-4815-a006-2ab82415c8a4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I3NjlhYTVlLTZlYWEtNDVkYS1iZDQ3LTZjNDA5ODAyYWM3ZFwvZGExaDhiZC1iMTJmMWU0My1hMmM3LTQ4MTUtYTAwNi0yYWI4MjQxNWM4YTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ThvK8MwEDRInzywTg15eYi0sYhKII57CgakDNhf3TNo",
      author: {
        name: "User3",
      },
    },
    {
      id: 6,
      name: "Cloud",
      fanArtUrl:
        "https://survivetheark.com/index.php?/gallery/image/37214-griffin-steam-art/&do=download",
      author: {
        name: "User3",
      },
    },
    {
      id: 7,
      name: "Cloud",
      fanArtUrl:
        "https://external-preview.redd.it/O5MEi5-Gq1zrf7wQNU5Dul5Uahr0yYjf_IU1HJ-BgCU.jpg?auto=webp&s=b4ef758f8ea3eff3c510c67c3d8cb668beea2ad1",
      author: {
        name: "User3",
      },
    },
    {
      id: 8,
      name: "Cloud",
      fanArtUrl:
        "https://cdnb.artstation.com/p/assets/covers/images/050/200/471/large/jozi-pix-jozi-pix-prudence-closeup.jpg?1654278350",
      author: {
        name: "User3",
      },
    },
  ];
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await route.posts.fetPosts();
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
    console.log(posts);
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
