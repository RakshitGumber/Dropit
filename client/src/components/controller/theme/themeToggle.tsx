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
      {isDark ? (
        <Icon icon="solar:moon-fog-broken" />
      ) : (
        <Icon icon="solar:sun-fog-broken" />
      )}
    </Toggle.Root>
  );
}
