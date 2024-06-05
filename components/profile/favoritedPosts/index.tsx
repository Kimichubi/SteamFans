import route from "@/app/api/route";
import { useEffect, useState } from "react";
import { Alert, CircularProgress, Pagination } from "@mui/material";
import Link from "next/link";

interface Post {
  id: number;
  name: string;
  fanArtUrl: string;
  _count: {
    likes: number;
    favorites: number;
  };
}

export default function FavoritedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUserFavoritedPosts = async (page: number) => {
      try {
        const response = await route.user.getUserFavorited(page);
        if (response.status === 200) {
          setPosts(response.data.message);
          setTotalPages(response.data.message);
          setError(null);
        } else {
          setError("Erro ao buscar posts favoritados.");
        }
      } catch (err) {
        setError("Erro ao buscar posts favoritados.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserFavoritedPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-transparent rounded-md shadow-md border-white border">
      <h2 className="text-2xl font-bold mb-4">Posts Favoritados!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-300 rounded-md p-4">
            <Link href={`/category/post/${post.id}`}>
              <img
                src={`http://localhost:8080${post.fanArtUrl}`}
                alt={post.name}
                className="rounded-md w-full h-40 object-cover mb-4 transition-transform transform hover:scale-105"
              />
              <h3 className="text-lg font-bold">{post.name}</h3>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          color="primary"
          className="bg-white rounded-lg"
        />
      </div>
    </div>
  );
}
