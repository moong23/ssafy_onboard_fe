interface IContentFilterBtnProps {
  filter: string;
  content: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const ContentFilterBtn = ({ props }: { props: IContentFilterBtnProps }) => {
  return (
    <span className="bg-red-200 px-4 py-1 rounded-3xl font-semibold text-sm">
      <>{props.content}</>
    </span>
  );
};

export default ContentFilterBtn;
