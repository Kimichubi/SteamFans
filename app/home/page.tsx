"use client";

import { Container } from "@mui/material";
import HeaderAuth from "../components/homeAuth/header";
import RecentPosts from "../components/homeAuth/recentPosts";
import "../styles/home.css";

export default function HomePage() {
  return (
    <>
      <HeaderAuth />
      <Container className="containerRepeatImg max-w-full h-auto">
        {" "}
        <RecentPosts text={"Recently posts!"} />
      </Container>
    </>
  );
}
