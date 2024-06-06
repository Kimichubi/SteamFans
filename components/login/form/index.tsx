import route from "@/app/api/route";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Alert, Input, Typography } from "@mui/material";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState("bg-red-900");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (params.get("registered")) {
      setIsRegistered(true);
      setOpen(true);
      setColorOpen("bg-green-500");
      setMessage("Registro bem sucedido!");
      setTimeout(() => {
        setOpen(false);
        setColorOpen("bg-red-900");
      }, 1000 * 3);
      return;
    }
  }, [params]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    //@ts-ignore
    const response = await route.user.login(email, password);
    console.log(response);
    if (response.data.status === 200) {
      router.push("/home");
      return;
    } else {
      setOpen(true);
      setMessage(response.data.message);
      setTimeout(() => {
        setOpen(false);
      }, 1000 * 3);
      return;
    }
  };

  return (
    <>
      <section className="h-screen flex  justify-center items-center gap-12 w-auto containerGrid">
        {" "}
        <div className="w-auto h-auto flex">
          <Image
            src="/loginPage/steamLoginPage.png"
            alt="Sample image"
            width={250}
            height={250}
          />
        </div>
        <div className="flex flex-col w-auto h-auto bg-white rounded justify-center items-center p-10 ">
          <Typography className="font-bold">Bem vindo de volta!</Typography>
          <form onSubmit={handleSubmit}>
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-black">
                Sing IN
              </p>
            </div>
            <div className="flex flex-col justify-center items-center w-auto">
              {open === true ? (
                <>
                  <Alert
                    className={`text-white ${colorOpen} font-bold text-center flex justify-center items-center text-sm mb-4`}
                  >
                    {message}
                  </Alert>
                </>
              ) : (
                false
              )}
            </div>
            <Input
              fullWidth
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-t-blue-gray-200 focus:!border-t-gray-900  "
            />
            <Input
              fullWidth
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <Link
                className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                href="/help"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="mt-4 font-semibold text-sm text-black text-center md:text-left">
              Don&apos; t have an account?{" "}
              <Link
                className="text-red-600 hover:underline hover:underline-offset-4"
                href="/register"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
