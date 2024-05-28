import { Container } from "@mui/material";
import LoginForm from "./form";
import "./styles.css";
import FooterNoAuth from "../homeNoAuth/footer";

export default function LoginPage() {
  return (
    <>
      <Container className="min-w-full h-screen containerImg">
        <LoginForm />
      </Container>
    </>
  );
}
