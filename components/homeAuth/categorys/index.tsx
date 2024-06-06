
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
import SectionContent from "../sectionContent";
import "./style.css";
import categoryService from "@/app/api/services/categoryService";
const Categorys = ({ categoriasToPut }: any) => {
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

  const [totalCategories, setTotalCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const fetchCategories = async (currentPage: number) => {
      const response = await categoryService.getAllCategorys(currentPage);

      if (response.data.status === 200) {
        setCategorias(response.data.message);
        setTotalCategories(Math.ceil(response.data.message.categories / 10));
      }
    };
    if (categoriasToPut) {
      setCategorias(categoriasToPut);
    } else {
      fetchCategories(currentPage);
    }
  }, [categoriasToPut, currentPage]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div
        style={{
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          padding: "20px",
        }}
      >
        <Typography
          className="text-3xl font-bold leading-loose  dark:text-white border-b-stone-200-900 border-b"
          gutterBottom
        >
          {" "}
          Infos
        </Typography>
        <div>
          <SectionContent />
        </div>
        <Container className="rounded-md p-5">
          <Typography
            className="text-3xl font-bold leading-loose  dark:text-white border-b-stone-200-900 border-b"
            gutterBottom
          >
            Categorys
          </Typography>

          <Grid container spacing={4}>
            {categorias.map((categoria) => (
              <Grid item key={categoria.id} xs={12} sm={6} md={4} lg={4}>
                <Card className="bg-zinc-950 text-white shadow-md hover:shadow-lg transition-shadow w-auto h-full flex flex-col justify-between items-center">
                  <Link href={`/category/${categoria.id}`}>
                    <CardMedia
                      className="hover:-translate-y-1 hover:scale-110  duration-300 w-auto h-full"
                      component="img"
                      image={`https://database-steam-fans.onrender.com${categoria.imageUrl}`}
                      alt={categoria.name}
                    />
                  </Link>
                  <CardContent className="flex flex-col w-auto h-auto">
                    <Typography variant="h6" component="div">
                      {categoria.name}
                    </Typography>
                    <div className="flex justify-center my-auto contentMediaCategorys w-auto h-auto">
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
                    <div className="flex  justify-start items-center space-x-4">
                      <Typography
                        variant="body2"
                        className="text-white text-lg"
                      >
                        {categoria._count.posts} Posts
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {categorias.length === 0 && (
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 20 }}
            >
              <Typography className="text-white font-bold" variant="body1">
                Isso é tudo :)
              </Typography>
            </div>
          )}
          <Typography className="text-center mt-2 text-white border-b border-b-white">
            Page: {currentPage}
          </Typography>
          <Pagination
            count={totalCategories}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            color="primary"
            className="bg-white rounded-md w-1/3 m-auto max-sm:w-auto flex justify-center text-white"
          />
        </Container>
      </div>
    </>
  );
};

export default Categorys;
