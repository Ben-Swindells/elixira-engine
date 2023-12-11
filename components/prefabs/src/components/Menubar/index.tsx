import { Link } from "react-router-dom";

type MenubarProps = {
  children: React.ReactNode;
};

type MenubarButtonProps = {
  label: string;
  slug: string;
};

export const Menubar = ({ children }: MenubarProps) => {
  return (
    <div className="w-72 h-full border-r-[2px] border-white">{children}</div>
  );
};

export const MenubarButton = ({ label, slug }: MenubarButtonProps) => {
  return (
    <Link to={slug}>
      <button className="p-2 mb-0 flex justify-center items-center bg-[#700a80] hover:bg-white w-full text-white hover:text-black border-[#240329] border-4">
        {label}
      </button>
    </Link>
  );
};
