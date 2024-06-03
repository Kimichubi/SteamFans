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

interface Post {
  id: number;
  title: string;
  content: string;
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
          setPost(response.data.message);
          setIsLiked(response.data.message._count.likes > 0);
          setIsFavorited(response.data.message._count.favorites > 0);
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
    if (isLiked) {
      await route.posts.unLikePost(Number(router.id), Number(post?.categoryId));
    } else {
      await route.posts.likePost(Number(router.id), Number(post?.categoryId));
    }
    window.location.reload();
  };

  const handleFavoritePost = async () => {
    if (isFavorited) {
      await route.posts.unFavoritePost(
        Number(router.id),
        Number(post?.categoryId)
      );
    } else {
      await route.posts.favoritePost(
        Number(router.id),
        Number(post?.categoryId)
      );
    }
    window.location.reload();
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
      <Container className="my-8">
        <Card className="shadow-lg">
          <CardMedia
            component="img"
            height="400"
            image={`http://localhost:8080${post.fanArtUrl}`}
            alt={post.title}
          />
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {post.title}
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
            <Typography variant="body1" paragraph>
              {post.content}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
