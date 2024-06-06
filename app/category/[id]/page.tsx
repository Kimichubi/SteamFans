"use client";
import route from "@/app/api/route";
import HeaderAuth from "@/components/homeAuth/header";
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
  Pagination,
  Input,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import FooterNoAuth from "@/components/homeNoAuth/footer";
import PostsToSearch from "@/components/postSearch";
import { useRouter } from "next/navigation";

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
  name: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState("");
  const [postsToSearch, setPostsToSearch] = useState<Post[]>([]);
  const routerToPush = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("steam-token");
    if (!token) {
      routerToPush.push("/register");
      return;
    }
  });

  useEffect(() => {
    const getCategory = async (page: number) => {
      try {
        const response = await route.category.getOneCategory(
          Number(router.id),
          page
        );

        if (response.data.status === 200) {
          const categoryData = response.data.message;
          setCategoria(categoryData);
          setTotalPages(Math.ceil(response.data.message.posts / 10)); // Assumindo 10 posts por página

          const followResponse = await route.user.isFollowingCategory(
            Number(router.id)
          );
          setFollowing(followResponse.status === 200);
        }
      } catch (err) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    getCategory(currentPage);
  }, [router.id, currentPage]);

  const searchPosts = async (ev: any) => {
    ev.preventDefault();
    const response = await route.posts.postSearch(
      searchParams,
      currentPage,
      Number(router.id)
    );

    if (response.status === 200) {
      setPostsToSearch(response.data.message);
    }
  };

  const handleFollowCategory = async (categoryId: number) => {
    try {
      if (following) {
        await route.category.unFollowCategory(categoryId);
      } else {
        await route.category.followCategory(categoryId);
      }
      setFollowing(!following);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikePost = async (postId: number) => {
    try {
      const response = await route.user.isLikedPost(
        Number(router.id),
        Number(postId)
      );
      if (response.status === 200) {
        await route.posts.unLikePost(Number(postId), Number(router.id));
      } else {
        await route.posts.likePost(Number(postId), Number(router.id));
      }
      setCategoria((prevCategoria) => {
        if (!prevCategoria) return prevCategoria;
        return {
          ...prevCategoria,
          posts: prevCategoria.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  _count: {
                    ...post._count,
                    likes:
                      response.status === 200
                        ? post._count.likes - 1
                        : post._count.likes + 1,
                  },
                }
              : post
          ),
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavoritePost = async (postId: number) => {
    try {
      const response = await route.user.isFavoritedPost(
        Number(router.id),
        Number(postId)
      );
      if (response.status === 200) {
        await route.posts.unFavoritePost(Number(postId), Number(router.id));
      } else {
        await route.posts.favoritePost(Number(postId), Number(router.id));
      }
      setCategoria((prevCategoria) => {
        if (!prevCategoria) return prevCategoria;
        return {
          ...prevCategoria,
          posts: prevCategoria.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  _count: {
                    ...post._count,
                    favorites:
                      response.status === 200
                        ? post._count.favorites - 1
                        : post._count.favorites + 1,
                  },
                }
              : post
          ),
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <CircularProgress />
  //     </div>
  //   );
  // }

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
      <Container className=" bg-neutral-900 min-w-full min-h-screen flex flex-wrap justify-center">
        <div className="w-full h-full">
          {categoria && (
            <div className="text-center my-8 w-auto">
              <div className="w-full h-96 shadow-md ">
                <img
                  src={`https://database-steam-fans.onrender.com${categoria.imageUrl}`}
                  alt={categoria.name}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <Typography
                variant="h4"
                className="mt-4 text-white border-b border-white border-r border-l"
              >
                {categoria.name}
              </Typography>
              <div className="flex flex-wrap justify-center my-4 gap-4">
                <div className="flex items-center space-x-4">
                  <ThumbUpIcon className="text-blue-500" />
                  <Typography variant="body1" className="text-white">
                    {categoria._count.likes} Likes
                  </Typography>
                </div>
                <div className="flex items-center space-x-4">
                  <FavoriteIcon className="text-red-500" />
                  <Typography variant="body1" className="text-white">
                    {categoria._count.favorites} Favorites
                  </Typography>
                </div>
                <div className="flex items-center space-x-4">
                  <FollowTheSignsIcon className="text-black" />
                  <Typography variant="body1" className="text-white">
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
              <div>
                <Input
                  color="secondary"
                  className="text-white"
                  type="text"
                  placeholder="Search"
                  onChange={(ev) => {
                    setSearchParams(ev.currentTarget.value);
                  }}
                />
                <Button
                  onClick={(ev) => {
                    searchPosts(ev);
                  }}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </Button>
              </div>
              <div>
                <PostsToSearch postsToPut={postsToSearch} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {categoria.posts.map((post) => (
                  <Card
                    key={post.id}
                    className="border border-white shadow-md bg-transparent text-white w-full h-auto"
                  >
                    <Link href={`/category/post/${post.id}`}>
                      <CardMedia
                        component="img"
                        alt={post.name}
                        className="transition-transform transform hover:scale-105 max-h-64 rounded-sm"
                        image={`https://database-steam-fans.onrender.com${post.fanArtUrl}`}
                      />
                    </Link>
                    <CardContent className="p-4">
                      <Typography variant="h6">{post.name}</Typography>
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
          <div className="flex justify-center mt-6">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
              color="primary"
              className="bg-white rounded-md w-1/3 m-auto max-sm:w-auto flex justify-center text-white"
            />
          </div>
          <FooterNoAuth />
        </div>
      </Container>
    </>
  );
}
