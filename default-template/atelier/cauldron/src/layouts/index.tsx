import { OrbitControls } from "@react-three/drei";
import { Menubar, MenubarButton } from "../components/Menubar";
import { prefabPages } from "../pages";
import { Canvas } from "@react-three/fiber";

export const IntroductionLayout = () => {
  return (
    <div className="w-screen h-screen bg-[#240329] flex">
      <Menubar>
        <MenubarButton label={"Home"} slug={"/"} />
        {prefabPages.map((page, index) => {
          return (
            <MenubarButton
              key={index}
              label={page.buttonLabel}
              slug={page.path}
            />
          );
        })}
      </Menubar>
      <div className="flex w-full h-full justify-center items-center flex-col mx-14">
        <h1 className="text-4xl text-bold text-white mb-14">
          Welcome to your cauldron!
        </h1>
        <p className="text-2xl text-white mx-14 mb-6 text-center">
          Here you will find a place to merge all your scripts, animations and
          models into one place to export ready for use within the engine.
        </p>
        <p className="text-2xl text-white mx-14 mb-6 text-center">
          To test your prefab, simply add a new item to the pages.tsx file and
          add your prefab to the menu.
        </p>
        <p className="text-2xl  text-white mx-14 text-center">Happy brewing tests</p>
      </div>
    </div>
  );
};

type PrefabLayoutProps = {
  element: JSX.Element;
};

export const PrefabLayout = ({ element }: PrefabLayoutProps) => {
  return (
    <div className="w-screen h-screen bg-[#240329] flex">
      <Menubar>
        <MenubarButton label={"Home"} slug={"/"} />
        {prefabPages.map((page, index) => {
          return (
            <MenubarButton
              key={index}
              label={page.buttonLabel}
              slug={page.path}
            />
          );
        })}
      </Menubar>
      <div className="flex w-full h-full justify-center items-center">
        <div className="w-3/4 bg-gray-800 aspect-video flex">
          <Canvas shadows="soft">
            <ambientLight intensity={1} />
            <OrbitControls />
            {element}
          </Canvas>
        </div>
      </div>
    </div>
  );
};
