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
  newPost: async (name: string, fanArtUrl: any) => {
    const token = sessionStorage.getItem("steam-token");
    const body = { name, fanArtUrl };
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
    console.log(response);
    return response;
  },
};

export default postService;
