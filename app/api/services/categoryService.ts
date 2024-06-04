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
  getOneCategory: async (categoryId: number, page: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/category/getOne?page=${page}`,
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
  unFollowCategory: async (categoryId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/user/unfollow`,
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
  newCategory: async (name: string, imageUrl: any) => {
    const token = sessionStorage.getItem("steam-token");
    const body = { name, imageUrl };
    const response = await api
      .post("/new/category", body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response;
      });
    console.log(response);
    return response;
  },
  categorySearch: async (query: string, page: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .get(`/category/search?query=${query}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response;
      });
    console.log(response);
    return response;
  },
};

export default categoryService;
