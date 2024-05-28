import { Typography } from "@material-tailwind/react";
import "./styles.css";

export default function FooterNoAuth() {
  return (
    <>
      <footer className="flex w-full flex-row flex-wrap items-center justify-center  py-6 text-center ">
        <Typography className="font-normal text-white">
          &copy; KimichubiDev
        </Typography>
      </footer>
    </>
  );
}
