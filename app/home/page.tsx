"use client";
import { Container } from "@mui/material";
import HeaderAuth from "../components/homeAuth/header";
import "../styles/home.css";
import SectionContent from "../components/homeAuth/sectionContent";

import Categorys from "../components/homeAuth/categorys";
import YourFavoritedCategorys from "../components/homeAuth/yourFollowCategorys";
import FooterNoAuth from "../components/homeNoAuth/footer";

export default function HomePage() {
  return (
    <>
      <HeaderAuth />
      <Container className="containerTest min-w-full min-h-screen flex flex-wrap gap-2 justify-between">
        <Categorys />
        <FooterNoAuth />
      </Container>
    </>
  );
}
