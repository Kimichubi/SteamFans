import postService from "./services/postsService";

const route = {
  fetPosts: async () => {
    const response = await postService.fetchPosts();
    return response;
  },
};

export default route;
