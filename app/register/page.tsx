"use client";

import { Container } from "@mui/material";
import FooterNoAuth from "@/components/homeNoAuth/footer";
import HeaderNoAuth from "@/components/homeNoAuth/header";
import RegisterForm from "@/components/register/form";
import "../styles/register.css";
export default function RegisterPage() {
  return (
    <>
      <HeaderNoAuth />
      <Container className=" min-w-full h-auto containerRegisterImgRepeat">
        <RegisterForm></RegisterForm>
        <FooterNoAuth />
      </Container>
    </>
  );
}
