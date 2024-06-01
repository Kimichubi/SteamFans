import categoryService from "./services/categoryService";
import postService from "./services/postsService";
import userService from "./services/userService";

const route = {
  //Posts
  posts: {
    fetPosts: async () => {
      const response = await postService.fetchPosts();
      return response;
    },
    recentlyPosts: async () => {
      const response = await postService.recentlyPosts();
      return response;
    },
    likedPosts: async () => {
      const response = await postService.likedsPosts();
      return response;
    },
    favoritedPosts: async () => {
      const response = await postService.favoritedPosts();
      return response;
    },
    newPost: async (name: string, file: any, categoryId: number) => {
      const response = await postService.newPost(name, file, categoryId);

      return response;
    },
  },
  category: {
    getAllCategory: async (page: number) => {
      const response = await categoryService.getAllCategorys(page);
      return response;
    },
    getOneCategory: async (categoryId: number) => {
      const response = await categoryService.getOneCategory(categoryId);

      return response;
    },
    followCategory: async (categoryId: number) => {
      const response = await categoryService.followCategory(categoryId);

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
    getUserFollowingCategorys: async (page: number) => {
      const response = await userService.getFollowingCategorys(page);
      return response;
    },
    isFollowingCategory: async (categoryId: number) => {
      const response = await userService.isFollowingCategory(categoryId);
      return response;
    },
  },
};

export default route;
