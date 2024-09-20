"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (resolvedTheme === "dark") {
    return (
      <FiSun
        className="cursor-pointer"
        size={25}
        onClick={() => setTheme("light")}
      />
    );
  }
  if (resolvedTheme === "light") {
    return (
      <FiMoon
        className="cursor-pointer"
        color="#FFF"
        size={25}
        onClick={() => setTheme("dark")}
      />
    );
  }
}
