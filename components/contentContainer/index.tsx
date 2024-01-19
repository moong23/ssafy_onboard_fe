"use client";
import { IContent } from "@/interface/content";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "@/api/fetcher";
import moment from "moment";
import Image from "next/image";

const ContentContainer = ({
  props,
  type,
}: {
  props?: IContent;
  type: "view" | "create";
}) => {
  const router = useRouter();
  const [modifyMode, setModifyMode] = useState(type === "create");
  const [title, setTitle] = useState(props?.title || "");
  const [content, setContent] = useState(props?.content || "");
  const [date, setDate] = useState(props?.date || "");
  const [writer, setWriter] = useState(
    props?.writer || localStorage.getItem("email")
  );
  const [thumbnail, setThumbnail] = useState(props?.thumbnail || "");

  const handleCreateContent = async () => {
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

  const handleModifyContent = async () => {
    // fetcher
  };

  const handleRemoveContent = async () => {};

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
  useEffect(() => {
    confirmUser();
    console.log(props);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <span className="w-full basis-1/3 flex flex-row justify-between border border-white">
        <div className="w-full h-full flex flex-col">
          <input
            className="h-full font-bold text-4xl text-gray-200 pl-10 bg-transparent focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!modifyMode}
            placeholder="제목을 입력하세요."
          />
          <span className="w-full h-full flex flex-row justify-between items-center">
            <span className="flex w-1/2 h-full items-end pb-10 px-4 justify-start font-semibold">
              author : {writer}
            </span>
            <span className="flex w-1/2 h-full items-end pb-10 px-4 justify-end font-semibold">
              date : {moment(date || new Date()).format("YYYY.MM.DD")}
            </span>
          </span>
        </div>

        <div className="basis-1/3 border-l border-white">
          {thumbnail !== "" && (
            <div className="w-full aspect-square relative bg-slate-800">
              <Image
                src={thumbnail}
                alt="thumbnail"
                fill={true}
                layout="fill"
                objectFit="contain"
                className="pointer-events-none"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAA"
              />
            </div>
          )}
        </div>
      </span>
      <textarea
        className="w-full h-full bg-transparent text-gray-200 p-10 focus:outline-none resize-none border border-white"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={!modifyMode}
        placeholder="내용을 입력하세요."
      />
      {(localStorage.getItem("email") === props?.writer ||
        type === "create") && (
        <div className="w-full h-8 flex justify-end gap-4 mt-4">
          <button
            onClick={() => {
              setModifyMode(!modifyMode);
              if (modifyMode) {
                if (type === "create") {
                  handleCreateContent();
                } else {
                  handleModifyContent();
                }
              }
            }}
            className="bg-lime-200 rounded-3xl min-w-[100px] py-1 font-semibold"
          >
            수정
          </button>
          <button
            onClick={() => {
              handleRemoveContent();
            }}
            className="bg-lime-200 rounded-3xl min-w-[100px] py-1 font-semibold"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentContainer;
