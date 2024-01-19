interface IContentFilterBtnProps {
  filter: boolean;
  content: string;
  setFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentFilterBtn = ({ props }: { props: IContentFilterBtnProps }) => {
  const handleFilterClick = () => {
    if (props.content === "All") props.setFilter(false);
    else props.setFilter(true);
  };

  return (
    <span
      onClick={handleFilterClick}
      className={`${
        props.filter ? "bg-blue-400 text-white" : "bg-white"
      } min-w-16 text-center px-4 py-1 rounded-3xl font-semibold text-sm cursor-pointer`}
    >
      <>{props.content}</>
    </span>
  );
};

export default ContentFilterBtn;
