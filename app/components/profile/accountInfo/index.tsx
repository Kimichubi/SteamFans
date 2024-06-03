import route from "@/app/api/route";
import { useEffect } from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

export default function AcoountInfo() {
  const [user, setUser] = useEffect(() => {
    const getUserInfos = async () => {
      try {
        const response = await route.user.getUserInfos();
        if (response.status === 200) {
        }
      } catch (error) {}
    };
  });
  return <></>;
}
