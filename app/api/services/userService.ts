import { AxiosResponse } from "axios";
import api from "../api";

const userService = {
  login: async (email: string, password: string) => {
    const user = { email, password };
    //@ts-ignore
    const response = await api.post("/login", user).catch((err) => {
      if (err) {
        return err.response;
      }
    });
    if (response.data.status === 200) {
      sessionStorage.setItem("steam-token", response.data.message);
      return response;
    } else {
      return response;
    }
  },

  register: async (email: string, password: string, name: string) => {
    const user = { email, password, name };

    const response = await api.post("/register", user).catch((err) => {
      if (err) {
        return err.response;
      }
    });
    return response;
  },
  getUserInfos: async () => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .get("/user/infos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        if (err) {
          return err.response;
        }
      });

    return response;
  },
  getFollowingCategorys: async (page: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .get(`/user/following?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        if (err) {
          return err.response;
        }
      });

    return response;
  },
  isFollowingCategory: async (categoryId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/user/isFollowing`,
        { categoryId: Number(categoryId) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        if (err) {
          return err.response;
        }
      });

    return response;
  },
  isLiked: async (categoryId: number, postId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/user/likes/posts`,
        { categoryId: Number(categoryId), postId: Number(postId) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        if (err) {
          return err.response;
        }
      });

    return response;
  },
  isFavorited: async (categoryId: number, postId: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .post(
        `/user/favorited/posts`,
        { categoryId: Number(categoryId), postId: Number(postId) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        if (err) {
          return err.response;
        }
      });

    return response;
  },
  updateUserInfo: async (email: string, name: string) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .put(
        `/user/update`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        if (err) {
          return err.response;
        }
      });

    return response;
  },
  updateUserPassword: async (currentPassword: string, newPassword: string) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .put(
        `/user/update/password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        if (err) {
          return err.response;
        }
      });

    return response;
  },
  getUserLikeds: async (page: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .get(`/posts/user/likes?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        if (err) {
          return err.response;
        }
      });

    return response;
  },
  getUserFavorited: async (page: number) => {
    const token = sessionStorage.getItem("steam-token");

    const response = await api
      .get(`/posts/user/favorited?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        if (err) {
          return err.response;
        }
      });

    return response;
  },
};

export default userService;
