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

export default function UserPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUserPosts = async (page: number) => {
      try {
        const response = await route.user.getUserPosts(page);
        if (response.status === 200) {
          setPosts(response.data.message);
          setTotalPages(response.data.message);
          setError(null);
        } else {
          setError("Erro ao buscar Posts criados.");
        }
      } catch (err) {
        setError("Erro ao buscar Posts criados.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts(currentPage);
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Seus Posts!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((posts) => (
          <div key={posts.id} className="border border-gray-300 rounded-md p-4">
            <Link href={`/postUserInfos/${posts.id}`}>
              <img
                src={`http://localhost:8080${posts.fanArtUrl}`}
                alt={posts.name}
                className="rounded-md w-full h-40 object-cover mb-4 transition-transform transform hover:scale-105"
              />
              <h3 className="text-lg font-bold">{posts.name}</h3>
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
        />
      </div>
    </div>
  );
}
