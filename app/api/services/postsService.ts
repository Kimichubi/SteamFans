import api from "../api";

// URL da API Steam para obter a lista de aplicativos

// Função para obter a lista de jogos
const postService = {
  fetchPosts: async () => {
    const response = await api.get("/posts").catch((err) => {
      return err.response;
    });

    return response;
  },
  newPost: async ({ name, file }: any) => {
    console.log(file)
    const token = sessionStorage.getItem("steam-token");
    const body = { name, file };
    const response = await api
      .post("/upload", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response;
      });
    return response;
  },
};

export default postService;
