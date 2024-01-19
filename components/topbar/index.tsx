import { TopbarMainMenu } from "@/constants/Topbar";
import Link from "next/link";

const Topbar = () => {
  return (
    <nav className="w-full h-[250px] border-b-2 border-b-gray-200 px-[200px] pt-14 flex flex-col justify-between">
      <h1 className="font-extrabold text-[4rem]">My Blog</h1>
      <div className="w-full flex flex-row gap-[100px]">
        <Link className={`px-3 py-1`} href="/">
          탐색
        </Link>
        <Link className={`px-3 py-1`} href="/mypage">
          마이페이지
        </Link>
      </div>
    </nav>
  );
};
export default Topbar;
