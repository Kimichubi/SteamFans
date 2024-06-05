"use client";
import { Container } from "@mui/material";
import HeaderNoAuth from "../components/homeNoAuth/header";
import SendCodeForm from "../components/forgotPassword";

export default function HelpPage() {
  return (
    <>
      <HeaderNoAuth />
      <Container className="min-w-full h-screen bg-slate-900 flex justify-center flex-wrap">
        <SendCodeForm />
      </Container>
    </>
  );
}
