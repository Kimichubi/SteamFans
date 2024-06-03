"use client";

import { Container } from "@mui/material";
import HeaderAuth from "../components/homeAuth/header";
import PostForm from "../components/post";
import "../styles/post.css";
import FooterNoAuth from "../components/homeNoAuth/footer";
export default function Page() {
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
