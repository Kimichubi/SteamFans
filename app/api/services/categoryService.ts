import api from "../api";

const categoryService = {
  getAllCategorys: async (page: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .get(`/category/all?page=${page}`, {
        // Adicione o parâmetro de página na URL
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return response;
  },
  getOneCategory: async (categoryId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/category/getOne`,
        { categoryId },
        {
          // Adicione o parâmetro de página na URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        return err.response;
      });

    return response;
  },
  followCategory: async (categoryId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/category/follow`,
        { categoryId },
        {
          // Adicione o parâmetro de página na URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        return err.response;
      });

    return response;
  },
};

export default categoryService;
