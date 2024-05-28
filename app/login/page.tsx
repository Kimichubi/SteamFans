"use client";
import { Container } from "@mui/material";
import FooterNoAuth from "../components/homeNoAuth/footer";
import HeaderNoAuth from "../components/homeNoAuth/header";
import LoginForm from "../components/login/form";
import "../styles/login.css";
export default function Page() {
  return (
    <>
      <HeaderNoAuth></HeaderNoAuth>
      <Container className="containerImg min-w-full h-full">
        <LoginForm />
        <FooterNoAuth />
      </Container>
    </>
  );
}
