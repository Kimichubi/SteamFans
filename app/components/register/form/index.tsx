import route from "@/app/api/route";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./styles.css";
import { Alert, Input, Typography } from "@mui/material";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    //@ts-ignore

    if (password !== confirmPassword) {
      setOpen(true);
      setMessage("Senhas diferentes!");
      setTimeout(() => {
        setOpen(false);
      }, 1000 * 3);
      return;
    }

    const response = await route.user.register(email, password, name);

    if (response.data.status === 200) {
      router.push("/login?registered=true");
      return;
    } else if (response.data.status === 404 || response.data.status === 400) {
      setOpen(true);
      setMessage(response.data.message);
      setTimeout(() => {
        setOpen(false);
      }, 1000 * 3);
      return;
    }
    return;
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
        <div className="flex flex-col w-2/6 h-auto bg-white rounded justify-center items-center p-10 divForm">
          <Typography className="font-bold">
            Bem vindo, por favor registre-se!
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-black">
                Sing Up
              </p>
            </div>
            <div className="flex flex-col justify-center items-center w-auto">
              {open === true ? (
                <>
                  <Alert className="text-white font-bold text-center flex justify-center items-center bg-red-900 text-sm mb-4">
                    {message}
                  </Alert>
                </>
              ) : (
                false
              )}
            </div>
            <Input
              required
              fullWidth
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-t-blue-gray-200 focus:!border-t-gray-900  "
            />
            <Input
              required
              fullWidth
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-t-blue-gray-200 focus:!border-t-gray-900  "
            />
            <Input
              required
              fullWidth
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Input
              required
              fullWidth
              type="password"
              placeholder="Confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Register
              </button>
            </div>
            <div className="mt-4 font-semibold text-sm text-black text-center md:text-left">
              Have an account?{" "}
              <Link
                className="text-red-600 hover:underline hover:underline-offset-4"
                href="/login"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
