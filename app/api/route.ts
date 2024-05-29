import postService from "./services/postsService";
import userService from "./services/userService";

const route = {
  //Posts
  posts: {
    fetPosts: async () => {
      const response = await postService.fetchPosts();
      return response;
    },
    newPost: async ({ name, file }: any) => {
      const response = await postService.newPost({ name, file });

      return response;
    },
  },

  //User
  user: {
    login: async (email: string, password: string) => {
      const response = await userService.login(email, password);
      return response;
    },
    register: async (email: string, password: string, name: string) => {
      const response = await userService.register(email, password, name);
      return response;
    },
    getUserInfos: async () => {
      const response = await userService.getUserInfos();
      return response;
    },
  },
};

export default route;
