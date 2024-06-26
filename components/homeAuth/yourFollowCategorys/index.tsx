import { Button, Container, Pagination, Typography } from "@mui/material";
import SlideShowCategorys from "../../commons/carouselCategorys";
import { useEffect, useState } from "react";
import userService from "@/app/api/services/userService";

export default function YourFavoritedCategorys() {
  const [categorias, setCategorias] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await userService.getFollowingCategorys(page);
      if (response.data.status === 200) {
        setCategorias(response.data.message.followingCategories);
      }
    };
    fetchCategories();
  }, [page]);
  //@ts-ignore
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleNextPage = () => {
    setPage((prevPage) => {
      return categorias.length === 0 ? page : prevPage + 1;
    });
  };

  const handlePrevPage = () => {
    setPage((prevPage) => {
      return prevPage === 1 ? 1 : prevPage - 1;
    });
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
      <Container className=" bg-gradient-to-b  bg-zinc-700 rounded-md">
        <Typography
          className="max-w-lg text-3xl font-semibold leading-loose text-gray-900 dark:text-white"
          gutterBottom
        >
          Following categorys!
        </Typography>{" "}
        {categorias.length > 0 ? (
          <>
            {" "}
            <SlideShowCategorys categorias={categorias}></SlideShowCategorys>
          </>
        ) : (
          <>
            <p className="font-bold text-white">
              Isso é tudo, siga mais categorias!
            </p>
          </>
        )}
        {categorias.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            <Typography className="text-white font-bold " variant="body1">
              Isso é tudo :)
            </Typography>
          </div>
        ) : null}
        <div className="flex justify-center items-center ">
          {" "}
          <Pagination
            count={Math.ceil(categorias.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",

              alignItems: "center",
              width: "25%",
            }}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button variant="contained" onClick={handlePrevPage}>
            Anterior
          </Button>
          <Button variant="contained" onClick={handleNextPage}>
            Próxima
          </Button>
        </div>
      </Container>
    </div>
  );
}
