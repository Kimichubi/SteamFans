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
};

export default userService;
