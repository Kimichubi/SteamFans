"use client";
import { Container } from "@mui/material";
import FirstContent from "@/components/homeNoAuth/content/firstContent";
import SectionContent from "@/components/homeNoAuth/content/sectionContent";
import FooterNoAuth from "@/components/homeNoAuth/footer";
import HeaderNoAuth from "@/components/homeNoAuth/header";

export default function Home() {
  return (
    <main className="bg-slate-800 min-w-full min-h-dvh">
      <HeaderNoAuth />
      <Container className="containerToRepeat min-w-full">
        <FirstContent />
        <SectionContent text={"IMAGENS DA COMUNIDADE MAIS RECENTES!"} />
      </Container>
      <FooterNoAuth />
    </main>
  );
}
