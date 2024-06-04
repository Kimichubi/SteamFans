import api from "../api";

// URL da API Steam para obter a lista de aplicativos

// Função para obter a lista de jogos
const postService = {
  //No Token
  fetchPosts: async () => {
    const response = await api.get("/get/posts").catch((err) => {
      return err.response;
    });

    return response;
  },
  // Token
  recentlyPosts: async () => {
    const token = sessionStorage.getItem("steam-token");
    const response = await api
      .get("/get/posts/recently", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return response;
  },
  likedsPosts: async () => {
    const token = sessionStorage.getItem("steam-token");
    const response = await api
      .get("/posts/likes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return response;
  },
  favoritedPosts: async () => {
    const token = sessionStorage.getItem("steam-token");
    const response = await api
      .get("/posts/favoriteds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return response;
  },
  newPost: async (name: string, fanArtUrl: any, categoryId: number) => {
    const token = sessionStorage.getItem("steam-token");
    const body = { name, fanArtUrl, categoryId };
    const response = await api
      .post("/upload", body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response;
      });

    return response;
  },
  likePost: async (postId: number, categoryId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/like`,
        { postId, categoryId },
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
  unLikePost: async (postId: number, categoryId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/like/delete`,
        { postId, categoryId },
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
  favoritePost: async (postId: number, categoryId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/favorite`,
        { postId, categoryId },
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
  unFavoritePost: async (postId: number, categoryId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/favorite/delete`,
        { postId, categoryId },
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
  postById: async (postId: number) => {
    const token = sessionStorage.getItem("steam-token");
    const response = await api
      .post(
        "/posts/id",
        { postId },
        {
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
  postSearch: async (query: string, page: number, categoryId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/post/search?query=${query}&page=${page}`,
        { categoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        console.log(err.response.data);
        return err.response;
      });

    return response;
  },
  deletePost: async (postId: number, categoryId: number) => {
    try {
      const token = sessionStorage.getItem("steam-token");

      const response = await api
        .post(
          "/post/delete",
          { postId, categoryId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .catch((err) => {
          console.log(err.response.data);
          return err.response;
        });

      return response;
    } catch (error) {}
  },
};

export default postService;
