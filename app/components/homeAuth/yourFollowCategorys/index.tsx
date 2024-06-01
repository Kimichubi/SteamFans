import { Button, Container, Pagination, Typography } from "@mui/material";
import SlideShowCategorys from "../../commons/carouselCategorys";
import { useEffect, useState } from "react";
import route from "@/app/api/route";

export default function YourFavoritedCategorys() {
  const [categorias, setCategorias] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await route.user.getUserFollowingCategorys(page);
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
        backgroundImage: "url(/home/baseForFollowing.jpg)",
      }}
    >
      <Container>
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
              Você ainda não seguiu nenhuma categoria, explore este vasto mundo
              e depois volte aqui!
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
        <Pagination
          count={Math.ceil(categorias.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
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
