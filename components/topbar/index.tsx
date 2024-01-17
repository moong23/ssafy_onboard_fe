import { TopbarMainMenu } from "@/constants/Topbar";
import Link from "next/link";

const Topbar = () => {
  return (
    <div className="w-full h-[60px] flex flex-row items-center justify-center">
      <div className="min-w-[1024px]">
        {Object.entries(TopbarMainMenu).map(([key, value], index) => (
          <Link href={value.route} key={index}>
            {value.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Topbar;
