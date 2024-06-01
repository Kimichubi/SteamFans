"use client";
import { Container } from "@mui/material";
import HeaderAuth from "../components/homeAuth/header";
import "../styles/home.css";
import SectionContent from "../components/homeAuth/sectionContent";

import Categorys from "../components/homeAuth/categorys";
import YourFavoritedCategorys from "../components/homeAuth/yourFollowCategorys";

export default function HomePage() {
  return (
    <>
      <HeaderAuth />
      <SectionContent />
      <Categorys />
      <YourFavoritedCategorys />
    </>
  );
}
