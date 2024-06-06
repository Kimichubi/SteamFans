"use client";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import userService from "../api/services/userService";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState({ name: "" });
  useEffect(() => {
    async function FetchUserInfos() {
      try {
        const response = await userService.getUserInfos();
        if (response.status === 200) {
          setUser({ name: response.data.message.name });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    FetchUserInfos();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{`Bem vindo ${user.name}`}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
