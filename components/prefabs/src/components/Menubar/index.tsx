type MenubarProps = {
  children: React.ReactNode;
};

type MenubarButtonProps = {
  label: string;
};

export const Menubar = ({ children }: MenubarProps) => {
  return (
    <div className="w-72 h-full border-r-[2px] border-white">{children}</div>
  );
};

export const MenubarButton = ({ label }: MenubarButtonProps) => {
  return (
    <button className="p-2 flex justify-center items-center bg-[#700a80] hover:bg-white w-full text-white hover:text-black">
      {label}
    </button>
  );
};
