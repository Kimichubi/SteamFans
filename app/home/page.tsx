"use client";

import { Container } from "@mui/material";
import HeaderAuth from "../components/homeAuth/header";
import RecentPosts from "../components/homeAuth/recentPosts";
import "../styles/home.css";
import MostLikedPosts from "../components/homeAuth/mostLikedPosts";
import MostFavoritedPosts from "../components/homeAuth/mostFavoritedPosts";
import FooterNoAuth from "../components/homeNoAuth/footer";

export default function HomePage() {
  return (
    <>
      <HeaderAuth /> <RecentPosts text={"Recently posts!"} />
      <MostLikedPosts text={"Most liked posts!"} />
      <MostFavoritedPosts text={"Most favorited posts!"} />
    </>
  );
}
