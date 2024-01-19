import { IContent } from "@/interface/content";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

interface ICard extends Omit<IContent, "thumbnail"> {
  thumbnail?: string;
}

const Card = ({ props }: { props: ICard }) => {
  const router = useRouter();
  const cardContentTitle = `text-2xl font-bold text-gray-800`;
  const cardContentContent = `text-gray-700 text-base line-clamp-3 mb-2`;

  return (
    <div
      onClick={() => {
        console.log("redirect to", `/content/${props.id}`);
        router.push(`/content/${props.id}`);
        // redirect(`/auth/login`); -> TODO : 왜 안됨?!
      }}
      className="bg-slate-200 w-[300px] h-[350px] rounded-lg flex flex-col cursor-pointer"
    >
      <div className="flex p-2 gap-1 w-full">
        <span className="bg-red-500 inline-block center w-3 h-3 rounded-full"></span>
        <span className="bg-yellow-500 inline-block center w-3 h-3 rounded-full"></span>
        <span className="bg-green-500 box inline-block center w-3 h-3 rounded-full"></span>
      </div>
      {props.thumbnail && (
        <div className="w-[300px] aspect-video relative bg-slate-300">
          <Image
            src={props.thumbnail}
            alt="thumbnail"
            fill={true}
            layout="fill"
            objectFit="contain"
            className="pointer-events-none"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAA"
          />
        </div>
      )}
      <div className="px-4 py-2">
        <h1 className={cardContentTitle}>{props.title}</h1>
        <p className={cardContentContent}>{props.content}</p>
        <div className="w-full flex flex-row justify-between">
          <p className="text-sm text-gray-800 font-semibold">{props.writer}</p>
          <p className="text-sm text-gray-500">
            {moment(props.date).format("YYYY.MM.DD")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
