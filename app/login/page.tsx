"use client";
import { Container } from "@mui/material";
import FooterNoAuth from "../components/homeNoAuth/footer";
import HeaderNoAuth from "../components/homeNoAuth/header";
import LoginForm from "../components/login/form";
import "../styles/login.css";
export default function LoginPage() {
  return (
    <>
      <HeaderNoAuth></HeaderNoAuth>
      <Container className="bg-slate-800 min-w-full h-full">
        <LoginForm />
        <FooterNoAuth />
      </Container>
    </>
  );
}
