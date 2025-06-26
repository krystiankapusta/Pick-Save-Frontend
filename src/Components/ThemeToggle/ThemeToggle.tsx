import { Moon, SunMedium, Monitor } from 'lucide-react';
import { useState } from 'react';
import UseTheme from '../../Hooks/UseTheme';

type ThemeKey = 'light' | 'dark' | 'system';
const themes = {
    light: { name: 'Light', Icon: <SunMedium width={20} height={20} /> },
    dark: { name: 'Dark', Icon: <Moon width={20} height={20} /> },
    system: { name: 'System', Icon: <Monitor width={20} height={20} /> },
};

const ThemeToggle = () => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [theme, setTheme] = UseTheme();
    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    };
    const handleThemeChange = (theme: ThemeKey) => {
        console.log(theme);
        setTheme(theme);
        setDropDownOpen(false);
    };
    return (
        <div>
            <div>
                <button
                    onClick={toggleDropDown}
                    className="flex items-center dark:text-white gap-2 px-4 py-2 border rounded"
                >
                    {themes[theme].Icon}
                </button>
                {dropDownOpen && (
                    <div className="absolute right-5 mt-2 w-28 rounded-md shadow-lg bg-white dark:bg-gray-600 ring-1 ring-black ring-opacity-5">
                        <div className="">
                            {Object.entries(themes).map(
                                ([key, { name, Icon }]) => (
                                    <button
                                        key={key}
                                        onClick={() =>
                                            handleThemeChange(
                                                key as keyof typeof themes
                                            )
                                        }
                                        className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-500 ${
                                            theme === key ? 'font-bold' : ''
                                        }`}
                                    >
                                        {Icon}
                                        <span className="ml-2">{name}</span>
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThemeToggle;
