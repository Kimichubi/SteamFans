import { Button, Container } from "@mui/material";
import "./styles.css";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Link from "next/link";
export default function FirstContent() {
  return (
    <>
      <Container className="flex justify-center flex-col containerToRepeat min-w-full h-72 gap-6 items-center">
        <div className="flex flex-col gap-5">
          <p className="font-bold text-gray-400 text-4xl mediaText">
            Bem vindo a comunidade de Artes feitas por fans(Fans Arts) Steam.
          </p>{" "}
          <p className="font-bold text-zinc-200 text-base mediaTextSml">
            O melhor lugar para encontrar suas imagens favoritas, dos seus jogos
            favoritos!
          </p>
        </div>

        <div>
          <Link href="/login">
            <Button variant="outlined" className="text-base text-center">
              Entrar agora!
            </Button>
          </Link>
        </div>
        <ArrowDownwardIcon
          fontSize="large"
          color="primary"
          className="arrowAnimation"
        />
      </Container>
    </>
  );
}
