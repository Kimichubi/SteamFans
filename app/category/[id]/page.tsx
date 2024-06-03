"use client";
import route from "@/app/api/route";
import HeaderAuth from "@/app/components/homeAuth/header";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import {
  Container,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import FooterNoAuth from "@/app/components/homeNoAuth/footer";

// Define the category type
interface Category {
  id: number;
  name: string;
  imageUrl: string;
  posts: Post[];
  _count: {
    likes: number;
    favorites: number;
    posts: number;
    followers: number;
  };
}

interface Post {
  id: number;
  title: string;
  content: string;
  fanArtUrl: string;
  author: {
    name: string;
  };
  _count: {
    likes: number;
    favorites: number;
  };
}

export default function PageCategory() {
  const router = useParams();
  const [categoria, setCategoria] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [following, setFollowing] = useState(false);

  const [posts, setPosts] = useState<null | Post>(null);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await route.category.getOneCategory(Number(router.id));

        if (response.data.status === 200) {
          setCategoria(response.data.message);
          setPosts(response.data.message.posts);

          const newresponse = await route.user.isFollowingCategory(
            Number(router.id)
          );
          if (newresponse.status === 200) {
            setFollowing(true);
          } else {
            setFollowing(false);
          }
        }
      } catch (err) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    getCategory();
  }, []);

  const handleFollowCategory = async (categoryId: number) => {
    if (following) {
      const response = await route.category.unFollowCategory(categoryId);
      if (response.status === 200) {
        setFollowing(false);
      }
    } else {
      const response = await route.category.followCategory(categoryId);
      if (response.data.status === 200) {
        setFollowing(true);
      }
    }
    window.location.reload();
  };

  const handleLikePost = async (postId: number) => {
    const response = await route.user.isLikedPost(
      Number(router.id),
      Number(postId)
    );
    if (response.status === 200) {
      await route.posts.unLikePost(Number(postId), Number(router.id));
    } else {
      await route.posts.likePost(Number(postId), Number(router.id));
    }
    window.location.reload();
  };

  const handleFavoritePost = async (postId: number) => {
    const response = await route.user.isFavoritedPost(
      Number(router.id),
      Number(postId)
    );
    if (response.status === 200) {
      await route.posts.unFavoritePost(Number(postId), Number(router.id));
    } else {
      await route.posts.favoritePost(Number(postId), Number(router.id));
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

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <>
      <HeaderAuth />
      <Container>
        {categoria && (
          <div className="text-center my-8">
            <div className="relative w-full h-96 rounded-lg shadow-md overflow-hidden">
              <img
                src={`http://localhost:8080${categoria.imageUrl}`}
                alt={categoria.name}
                className="w-full h-full object-cover"
              />
            </div>
            <Typography variant="h4" className="mt-4">
              {categoria.name}
            </Typography>
            <div className="flex justify-around my-4">
              <div className="flex items-center space-x-4">
                <ThumbUpIcon className="text-blue-500" />
                <Typography variant="body1">
                  {categoria._count.likes} Likes
                </Typography>
              </div>
              <div className="flex items-center space-x-4">
                <FavoriteIcon className="text-red-500" />
                <Typography variant="body1">
                  {categoria._count.favorites} Favorites
                </Typography>
              </div>
              <div className="flex items-center space-x-4">
                <FollowTheSignsIcon className="text-black" />
                <Typography variant="body1">
                  {categoria._count.followers} Followers
                </Typography>
                <IconButton
                  className="transition-transform transform hover:scale-105"
                  onClick={() => handleFollowCategory(categoria.id)}
                  color="primary"
                >
                  <Typography variant="body1">
                    {following ? "Unfollow" : "Follow"}
                  </Typography>
                </IconButton>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {categoria.posts.map((post) => (
                <Card key={post.id} className="shadow-md">
                  <Link href={`/category/post/${post.id}`}>
                    <CardMedia
                      component="img"
                      alt={post.title}
                      height="140"
                      className="transition-transform transform hover:scale-105"
                      image={`http://localhost:8080${post.fanArtUrl}`}
                    />
                  </Link>
                  <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.content}
                    </Typography>
                    <Typography variant="body2" className="mt-2">
                      Autor: {post.author.name}
                    </Typography>
                    <div className="flex justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <IconButton
                          className="transition-transform transform hover:scale-105"
                          onClick={() => handleLikePost(post.id)}
                          color="primary"
                        >
                          <ThumbUpIcon />
                        </IconButton>
                        <Typography variant="body2">
                          {post._count.likes}
                        </Typography>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IconButton
                          className="transition-transform transform hover:scale-105"
                          onClick={() => handleFavoritePost(post.id)}
                          color="secondary"
                        >
                          <FavoriteIcon />
                        </IconButton>
                        <Typography variant="body2">
                          {post._count.favorites}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        <FooterNoAuth />
      </Container>
    </>
  );
}
