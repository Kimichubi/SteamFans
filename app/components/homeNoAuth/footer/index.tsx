import { Typography } from "@material-tailwind/react";
import "./styles.css";

export default function FooterNoAuth() {
  return (
    <>
      <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-blue-gray-50 py-6 text-center md:justify-between">
        <Typography className="font-normal  text-gray-200">
          &copy; KimichubiDev
        </Typography>
      </footer>
    </>
  );
}
