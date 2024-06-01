import route from "@/app/api/route";
import { useEffect, useState } from "react";
import { Container, Typography, Pagination, Button } from "@mui/material";
import SlideShowCategorys from "../../commons/carouselCategorys";

const Categorys = () => {
  const [categorias, setCategorias] = useState<
    { id: number; name: string; imageUrl: string }[]
  >([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await route.category.getAllCategory(page);

      if (response.data.status === 200) {
        setCategorias(response.data.message);
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
      <Container className=" bg-gradient-to-b  bg-zinc-700 rounded-md ">
        <Typography
          className="max-w-lg text-3xl font-semibold leading-loose text-gray-900 dark:text-white"
          gutterBottom
        >
          Some categorys!
        </Typography>{" "}
        <SlideShowCategorys categorias={categorias}></SlideShowCategorys>
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
};

export default Categorys;
