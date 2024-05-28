import { Container } from "@mui/material";
import LoginForm from "./form";
import "./styles.css";



export default function LoginPage() {
  return (
    <>
      <Container className="min-w-full h-sreen containerImg">
        <LoginForm />
      </Container>
    </>
  );
}
