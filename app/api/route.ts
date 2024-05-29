import postService from "./services/postsService";
import userService from "./services/userService";

const route = {
  //Posts
  fetPosts: async () => {
    const response = await postService.fetchPosts();
    return response;
  },

  //User

  login: async (email: string, password: string) => {
    const response = await userService.login(email, password);
    return response;
  },
  register: async (email: string, password: string, name: string) => {
    const response = await userService.register(email, password, name);
    return response;
  },
};

export default route;
