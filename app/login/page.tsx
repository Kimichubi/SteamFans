"use client";
import HeaderNoAuth from "../components/homeNoAuth/header";
import LoginPage from "../components/login";

export default function Page() {
  return (
    <>
      <HeaderNoAuth></HeaderNoAuth>
      <LoginPage />
    </>
  );
}
