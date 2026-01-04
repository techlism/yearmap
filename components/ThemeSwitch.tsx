"use client";
import { BlindsIcon } from "lucide-react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps, useTheme } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        }
        if (theme === "light") {
            setTheme("dark");
        }
        if (theme === "system") {
            setTheme("dark");
        }
    };

    return (
        <button
            aria-label={`${theme} mode`}
            onClick={toggleTheme}
            type="button"
            className="flex items-center justify-center transition-opacity duration-300 hover:bg-accent p-2 rounded-lg cursor-pointer hover:opacity-90"
        >
            {
                <BlindsIcon size={18} />
            }
        </button>
    );
}