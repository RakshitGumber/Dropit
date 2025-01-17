import { ToggleTheme, Submit } from "../Button";

export const Header = () => {
  return (
    <div className="flex h-14 z-50 bg-background fixed w-full justify-between items-center px-4 border-b">
      <div className="border-r h-full pr-8 pl-4 w-64 justify-center flex items-center">
        <h1 className="text-2xl font-bold">Rakshit Gumber</h1>
      </div>
      <div className="flex items-center gap-2">
        <ToggleTheme />
        <Submit />
      </div>
    </div>
  );
};
