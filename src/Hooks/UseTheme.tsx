import { useEffect, useState } from 'react';
type ThemeKey = 'light' | 'dark' | 'system';
const getStoredTheme = (): ThemeKey => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
    }
    return 'system';
};

const UseTheme = (): [
    ThemeKey,
    React.Dispatch<React.SetStateAction<ThemeKey>>,
] => {
    const [theme, setTheme] = useState<ThemeKey>(getStoredTheme());

    const element = document.documentElement;
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onWindowMatch = () => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && darkQuery.matches)
        ) {
            element.classList.add('dark');
        } else {
            element.classList.remove('dark');
        }
    };

    useEffect(() => {
        onWindowMatch();
    }, []);

    useEffect(() => {
        switch (theme) {
            case 'dark':
                element.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                break;
            case 'light':
                element.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                break;
            default:
                localStorage.removeItem('theme');
                onWindowMatch();
                break;
        }
    }, [theme]);

    useEffect(() => {
        const changeHandler = (e: any) => {
            if (!('theme' in localStorage)) {
                if (e.matches) {
                    element.classList.add('dark');
                } else {
                    element.classList.remove('dark');
                }
            }
        };
        darkQuery.addEventListener('change', changeHandler);
        return () => {
            darkQuery.removeEventListener('change', changeHandler);
        };
    }, []);
    return [theme, setTheme];
};

export default UseTheme;
