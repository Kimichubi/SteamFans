import api from "../api";

const userService = {
  login: async (email: string, password: string) => {
    const user = { email, password };
    //@ts-ignore
    const response = await api.post("/login", user).catch((err) => {
      if (err) {
        return err;
      }
    });

    return response;
  },
  register: async (email: string, password: string, name: string) => {
    const user = { email, password, name };

    const response = await api.post("/register", user).catch((err) => {
      if (err) {
        return err;
      }
    });
    return response;
  },
};

export default userService;
