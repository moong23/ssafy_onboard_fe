"use client";

import { fetcher } from "@/api/fetcher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      fetcher
        .get(`/isUser?email=${email}`)
        .then((res) => {
          if (res.data !== "User exists") throw Error("User not exists");
        })
        .catch((err) => {
          alert(err);
          console.log(err);
          router.push("/auth/login");
        });
    }
    console.log("test home");
  }, []);

  return <main className="">123</main>;
}
