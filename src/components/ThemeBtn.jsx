import { useTheme } from "../context";
import darkIcon from '../icons/moon.svg';
import lightIcon from '../icons/sun.svg';

export default function ModeSwitcher() {
    const { themeMode, setThemeMode } = useTheme();

    const toggleTheme = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            className="p-2  bg-[#122440] dark:bg-[#e7f5f5] text-gray-800 dark:text-gray-200 rounded"
            onClick={toggleTheme}
        >
        {themeMode === 'light'?<img src={darkIcon} alt="Moon Icon" className="w-12 h-6" /> : <img src={lightIcon} alt="sunIcon" className="w-12 h-6" />}
        </button>
    );
};