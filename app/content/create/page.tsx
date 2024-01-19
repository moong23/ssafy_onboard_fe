import ContentContainer from "@/components/contentContainer";
const CreateContent = () => {
  return (
    <div className="w-full h-full bg-zinc-500 flex justify-center items-center">
      <div className="w-[80vw] min-w-[600px] bg-slate-800 h-4/5 rounded-3xl flex flex-col p-10">
        <ContentContainer type={"create"} />
      </div>
    </div>
  );
};

export default CreateContent;
