"use client";

import { Container } from "@mui/material";
import HeaderAuth from "../components/homeAuth/header";
import RecentPosts from "../components/homeAuth/recentPosts";

export default function HomePage() {
  return (
    <>
      <HeaderAuth />

      <RecentPosts text={"Recently posts!"} />
    </>
  );
}
