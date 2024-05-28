import route from "@/app/api/route";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SectionContent() {
  const [posts, setPosts] = useState([]);

  const hardCodedPostsToTest = [
    {
      id: 1,
      name: "Akamaihd",
      fanArtUrl:
        "https://steamuserimages-a.akamaihd.net/ugc/781854100511555950/965B7BACEE3525578C7A812798E8565B9DEB755C/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      author: {
        name: "User1",
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
      name: "Test3",
      fanArtUrl:
        "https://steamuserimages-a.akamaihd.net/ugc/309991900834847060/550AEB5C0A619E0E0EB11074F3EE293AF79932A4/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      author: {
        name: "User4",
      },
    },
  ];

  //   useEffect(() => {
  //     async function fetchGames() {
  //       try {
  //         const response = await route.fetPosts();
  //         //  @ts-ignore
  //         setPosts(response.posts);
  //       } catch (error) {
  //         if (error) {
  //           console.error(error);
  //           return;
  //         }
  //       }
  //     }
  //     fetchGames();
  //   }, []);

  return (
    <>
      <Container>
        <Typography>Algumas imagens da comunidade!</Typography>
        <Box className="posts-container">
          {hardCodedPostsToTest.map((post) => (
            <div key={post.id} className="post">
              <h2>{post.author.name}</h2>
              <img
                src={`${post.fanArtUrl}`}
                alt={`${post.name}`}
                width={100}
                height={100}
              ></img>
            </div>
          ))}
        </Box>
      </Container>
    </>
  );
}
