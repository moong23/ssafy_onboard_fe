import { fetcher } from "@/api/fetcher";
import { IContent } from "@/interface/content";
import ContentContainer from "@/components/contentContainer";

const Content = async ({ params }: { params: { id: number } }) => {
  async function getContentById() {
    "use server";
    const { id } = params;
    return fetcher
      .get(`/content/${id}`)
      .then((res) => {
        // console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getContentByIdCompare1_suc() {
    "use server";
    const { id } = params;
    const res = await fetcher.get(`/content/${id}`);
    return res;
  }
  async function getContentByIDCompare2_fail() {
    "use server";
    const { id } = params;
    fetcher
      .get(`/content/${id}`)
      .then((res) => {
        // console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // const data = await getContentById();
  const data: IContent = await getContentById();
  console.log("27" + data);
  // const data2 = await getContentById2();
  // console.log("29" + data2);

  return (
    <div className="w-full h-full bg-zinc-500 flex justify-center items-center">
      <div className="w-[80vw] min-w-[600px] bg-white h-4/5 rounded-3xl flex flex-col p-10">
        <ContentContainer />
      </div>
    </div>
  );
};

export default Content;
