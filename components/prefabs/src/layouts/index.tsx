import { Menubar, MenubarButton } from "../components/Menubar";

export const MainLayout = () => {
  return (
    <div className="w-screen h-screen bg-[#240329] flex">
      <Menubar>
        <MenubarButton label="Home" />
      </Menubar>
      <div className="flex w-full h-full justify-center items-center">
        <p className="text-4xl text-bold text-white">Welcome to your prefabs</p>
      </div>
    </div>
  );
};
