import api from "../api";

// URL da API Steam para obter a lista de aplicativos

// Função para obter a lista de jogos
const postService = {
  fetchPosts: async () => {
    const response = await api.get("/get/posts").catch((err) => {
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
