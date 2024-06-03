"use client";
import route from "@/app/api/route";
import HeaderAuth from "@/app/components/homeAuth/header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GetAppIcon from "@mui/icons-material/GetApp";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Link from "next/link";

interface Post {
  id: number;
  name: string;
  fanArtUrl: string;
  categoryId: number;
  author: {
    name: string;
  };
  _count: {
    likes: number;
    favorites: number;
  };
}

export default function PagePost() {
  const router = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    async function fetchPostInfos() {
      try {
        const response = await route.posts.postById(Number(router.id));
        if (response.status === 200) {
          const post = response.data.message;
          setPost(post);

          const [likeResponse, favoriteResponse] = await Promise.all([
            route.user.isLikedPost(post.categoryId, post.id),
            route.user.isFavoritedPost(post.categoryId, post.id),
          ]);

          if (likeResponse.status === 200) {
            setIsLiked(true);
          }
          if (favoriteResponse.status === 200) {
            setIsFavorited(true);
          }
        }
      } catch (error) {
        console.error("Error fetching post info:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPostInfos();
  }, [router.id]);

  const handleLikePost = async () => {
    try {
      if (isLiked) {
        await route.posts.unLikePost(
          Number(router.id),
          Number(post?.categoryId)
        );
        setIsLiked(false);
        setPost(
          (prevPost) =>
            prevPost && {
              ...prevPost,
              _count: { ...prevPost._count, likes: prevPost._count.likes - 1 },
            }
        );
      } else {
        await route.posts.likePost(Number(router.id), Number(post?.categoryId));
        setIsLiked(true);
        setPost(
          (prevPost) =>
            prevPost && {
              ...prevPost,
              _count: { ...prevPost._count, likes: prevPost._count.likes + 1 },
            }
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleFavoritePost = async () => {
    try {
      if (isFavorited) {
        await route.posts.unFavoritePost(
          Number(router.id),
          Number(post?.categoryId)
        );
        setIsFavorited(false);
        setPost(
          (prevPost) =>
            prevPost && {
              ...prevPost,
              _count: {
                ...prevPost._count,
                favorites: prevPost._count.favorites - 1,
              },
            }
        );
      } else {
        await route.posts.favoritePost(
          Number(router.id),
          Number(post?.categoryId)
        );
        setIsFavorited(true);
        setPost(
          (prevPost) =>
            prevPost && {
              ...prevPost,
              _count: {
                ...prevPost._count,
                favorites: prevPost._count.favorites + 1,
              },
            }
        );
      }
    } catch (error) {
      console.error("Error favoriting post:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h6" color="error">
          Post not found.
        </Typography>
      </div>
    );
  }

  return (
    <>
      <HeaderAuth />
      <Container className="my-8 flex flex-col justify-center items-center p-auto max-w-screen max-h-screen ">
        <Card className="shadow-lg flex flex-col justify-center items-center">
          <CardMedia
            component="img"
            style={{
              maxWidth: "100%",
              maxHeight: "600px",
              objectFit: "contain",
            }}
            image={`http://localhost:8080${post.fanArtUrl}`}
            alt={post.name}
          />
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {post.name}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              By {post.author.name}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={2}
            >
              <Box display="flex" alignItems="center">
                <IconButton color="primary" onClick={handleLikePost}>
                  <ThumbUpIcon />
                </IconButton>
                <Typography variant="body1">
                  {post._count.likes} Likes
                </Typography>
                {isLiked && (
                  <Typography variant="body2" color="textSecondary">
                    (Unlike)
                  </Typography>
                )}
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton color="secondary" onClick={handleFavoritePost}>
                  <FavoriteIcon />
                </IconButton>
                <Typography variant="body1">
                  {post._count.favorites} Favorites
                </Typography>
                {isFavorited && (
                  <Typography variant="body2" color="textSecondary">
                    (Unfavorite)
                  </Typography>
                )}
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              href={`http://localhost:8080${post.fanArtUrl}`}
              download={`download-${post.id}`}
              startIcon={<GetAppIcon />}
            >
              Download Image
            </Button>
            <Button variant="contained" color="primary">
              <Link href={`/category/${post.categoryId}`}>Categoria</Link>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
