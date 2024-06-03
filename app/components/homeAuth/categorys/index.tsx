import route from "@/app/api/route";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import Link from "next/link";

const Categorys = () => {
  const [categorias, setCategorias] = useState<
    {
      id: number;
      name: string;
      imageUrl: string;
      _count: {
        likes: number;
        favorites: number;
        posts: number;
        followers: number;
      };
    }[]
  >([]);
  const [page, setPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await route.category.getAllCategory(page);

      if (response.data.status === 200) {
        setCategorias(response.data.message);
        setTotalCategories(response.data.message.categories);
      }
    };
    fetchCategories();
  }, [page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div
      style={{
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        padding: "20px",
      }}
    >
      <Container className="rounded-md p-5">
        <Typography
          className="text-3xl font-semibold leading-loose text-gray-900 dark:text-white text-center"
          gutterBottom
        >
          Some categories!
        </Typography>
        <Grid container spacing={4}>
          {categorias.map((categoria) => (
            <Grid item key={categoria.id} xs={12} sm={6} md={4} lg={4}>
              <Card className="bg-zinc-800 text-white shadow-md hover:shadow-lg transition-shadow h-full">
                <Link href={`/category/${categoria.id}`}>
                  <CardMedia
                    className="hover:-translate-y-1 hover:scale-110  duration-300"
                    component="img"
                    height="140"
                    image={`http://localhost:8080${categoria.imageUrl}`}
                    alt={categoria.name}
                  />
                </Link>
                <CardContent>
                  <Typography variant="h6" component="div">
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
                    </div>
                  </div>
                  <Typography variant="body2" className="text-white">
                    {categoria._count.posts} Posts
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {categorias.length === 0 && (
          <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            <Typography className="text-white font-bold" variant="body1">
              Isso é tudo :)
            </Typography>
          </div>
        )}
        <Typography className="text-center mt-2">Page: {page}</Typography>
        <Pagination
          count={Math.ceil(totalCategories / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
          color="secondary"
          showFirstButton
          showLastButton
          size="large"
        />
      </Container>
    </div>
  );
};

export default Categorys;
