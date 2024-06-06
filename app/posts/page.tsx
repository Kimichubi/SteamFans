"use client";

import { Container } from "@mui/material";
import HeaderAuth from "../../components/homeAuth/header";
import PostForm from "../../components/post";
import "../styles/post.css";
import FooterNoAuth from "../../components/homeNoAuth/footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
  const routerToPush = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("steam-token");
    if (!token) {
      routerToPush.push("/register");
      return;
    }
  });

  return (
    <>
      <HeaderAuth />
      <Container className="postContainerImgRepeat min-w-full min-h-screen flex flex-col justify-center items-center p-6">
        {" "}
        <PostForm />
        <FooterNoAuth />
      </Container>
    </>
  );
}
