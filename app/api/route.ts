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
    likePost: async (postId: number, categoryId: number) => {
      const response = await postService.likePost(postId, categoryId);

      return response;
    },
    unLikePost: async (postId: number, categoryId: number) => {
      const response = await postService.unLikePost(postId, categoryId);

      return response;
    },
    favoritePost: async (postId: number, categoryId: number) => {
      const response = await postService.favoritePost(postId, categoryId);

      return response;
    },
    unFavoritePost: async (postId: number, categoryId: number) => {
      const response = await postService.unFavoritePost(postId, categoryId);

      return response;
    },
    postById: async (postId: number) => {
      const response = await postService.postById(Number(postId));

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
    unFollowCategory: async (categoryId: number) => {
      const response = await categoryService.unFollowCategory(categoryId);

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
    isLikedPost: async (categoryId: number, postId: number) => {
      const response = await userService.isLiked(categoryId, postId);
      return response;
    },
    isFavoritedPost: async (categoryId: number, postId: number) => {
      const response = await userService.isFavorited(categoryId, postId);
      return response;
    },
  },
};

export default route;
