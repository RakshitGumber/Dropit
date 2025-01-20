import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { RxMoon, RxSun } from "react-icons/rx";

export const ToggleTheme = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="ghost"
      size="icon"
    >
      <RxSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <RxMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
