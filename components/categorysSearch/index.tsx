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

const CategorysToSearch = ({ categoriasToPut, searchValue }: any) => {
  const [page, setPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(
    categoriasToPut.length
  );

  

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      {categoriasToPut.length < 1 ? (
        <></>
      ) : (
        <>
          {" "}
          <div
            style={{
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
              padding: "20px",
            }}
            className="bg-gradient-to-b bg-slate-900 "
          >
            <Container className="rounded-md p-5">
              <Typography
                className="text-3xl font-semibold leading-loose text-gray-900 dark:text-white text-center justify-center flex gap-6 m-auto border-b border-b-white"
                gutterBottom
              >
                <p className="text-slate-300 text-center">{searchValue}</p>
              </Typography>
              <Grid container spacing={4}>
                {categoriasToPut.map((categoria: any) => (
                  <Grid item key={categoria.id} xs={12} sm={6} md={4} lg={4}>
                    <Card className="bg-zinc-950 text-white shadow-md hover:shadow-lg transition-shadow w-auto h-full flex flex-col justify-between items-center">
                      <Link href={`/category/${categoria.id}`}>
                        <CardMedia
                          className="hover:-translate-y-1 hover:scale-110  duration-300 w-auto h-full"
                          component="img"
                          height="140"
                          image={`http://localhost:8080${categoria.imageUrl}`}
                          alt={categoria.name}
                        />
                      </Link>
                      <CardContent className="flex flex-col w-auto h-auto">
                        <Typography variant="h6" component="div">
                          {categoria.name}
                        </Typography>
                        <div className="flex justify-around my-4 contentMediaCategorys w-auto h-auto">
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
              {categoriasToPut.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Typography className="text-white font-bold" variant="body1">
                    Isso é tudo :)
                  </Typography>
                </div>
              )}
              <Typography className="text-center mt-2 text-white border-b border-b-white">
                Page: {page}
              </Typography>
              <Pagination
                className="bg-white rounded-md w-1/3 m-auto max-sm:w-auto"
                count={Math.ceil(totalCategories)}
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
        </>
      )}
    </>
  );
};

export default CategorysToSearch;
