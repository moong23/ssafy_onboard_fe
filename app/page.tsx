"use client";

import { fetcher } from "@/api/fetcher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IContent } from "@/interface/content";
import Card from "@/components/card";
import Topbar from "@/components/topbar";
import ContentFilterBtn from "@/components/contentFilterBtn";

export default function Home() {
  const router = useRouter();
  const [dataList, setDataList] = useState([]);
  const [filter, setFilter] = useState(false);

  const confirmUser = async () => {
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
  };

  const getContents = async () => {
    fetcher
      .get(`/content`)
      .then((res) => {
        console.log(res.data);
        setDataList(res.data);
      })
      .catch((err) => {
        alert("Internal Server Error");
      });
  };

  const pushContent = async () => {
    fetcher
      .post(`/content/create`, {
        title: "test",
        thumbnail: "test",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.\nlorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.\n",
        date: new Date(),
        writer: localStorage.getItem("email"),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    confirmUser();
    getContents();
    // pushContent();
    console.log("test home");
  }, []);

  const getContentByFilter = async () => {
    if (filter) {
      fetcher
        .get(`/content/filter/${localStorage.getItem("email")}`)
        .then((res) => setDataList(res.data))
        .catch((err) => console.log(err));
    } else {
      // 전체 글 보기
      getContents();
    }
  };

  useEffect(() => {
    getContentByFilter();
  }, [filter]);

  // fetcher.post(`/content/create`, {
  //   title: "test",
  //   thumbnail: "test",
  //   content:
  //     "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.\nlorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.\n",
  //   date: new Date(),
  //   writer: localStorage.getItem("email"),
  // });

  return (
    <>
      <Topbar />

      <main className="w-full h-full px-[200px] pb-10">
        <div className="flex flex-row ">carousel div</div>
        <div className="flex flex-row my-12 font-semibold pl-4 justify-between">
          <span className="flex flex-row gap-8">
            필터:
            <ContentFilterBtn
              props={{ filter: !filter, content: "All", setFilter: setFilter }}
            />
            <ContentFilterBtn
              props={{ filter: filter, content: "My", setFilter: setFilter }}
            />
          </span>
          <button
            onClick={() => router.push(`/content/create`)}
            className="bg-lime-200 rounded-3xl min-w-[100px] py-1"
          >
            글쓰기
          </button>
        </div>
        <div className="w-full h-full grid grid-row-3 grid-flow-col gap-4 pb-10 relative">
          {dataList.map((data: IContent) => {
            return <Card key={data.date} props={data} />;
          })}
        </div>
      </main>
    </>
  );
}
