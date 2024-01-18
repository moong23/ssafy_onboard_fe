"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Home() {
  useLayoutEffect(() => {
    const isAuth = true; // TODO : need to change this to login logic
    redirect("/auth/login");
  }, []);

  return <main className="">123</main>;
}
