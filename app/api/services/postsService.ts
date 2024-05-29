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
};

export default postService;
