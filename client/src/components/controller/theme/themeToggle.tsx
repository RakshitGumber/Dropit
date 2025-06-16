import { useTheme } from "@/hooks/useTheme";
import { Icon } from "@iconify/react";
import * as Toggle from "@radix-ui/react-toggle";
import "./themeToggle.scss";

export default function themeToggle() {
  const { isDark, toggleDark } = useTheme();

  return (
    <Toggle.Root
      pressed={isDark}
      onPressedChange={toggleDark}
      className="toggle-mode"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Icon icon="fa:moon-o" /> : <Icon icon="fa:sun-o" />}
    </Toggle.Root>
  );
}
