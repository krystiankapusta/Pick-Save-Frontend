import { useSidebarContext } from '../../Context/SidebarContext';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type SideBarItemProps = {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
    to?: string;
};
export function SidebarItem({
    icon,
    text,
    active = false,
    alert = false,
    to,
}: SideBarItemProps) {
    const { expanded } = useSidebarContext();
    const navigate = useNavigate();
    const handleClick = () => {
        if (to) navigate(to);
    };
    return (
        <li
            onClick={handleClick}
            className={`relative flex justify-center items-center py-2 my-1 font-medium rounded-md cursor-pointer transition-colors group 
            ${expanded ? 'ml-3' : 'ml-1'} ${
                active
                    ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
                    : 'hover:bg-indigo-50 text-gray-600'
            }`}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${
                    expanded ? 'w-52 ml-3' : 'w-0'
                }`}
            >
                {text}
            </span>

            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                        expanded ? '' : 'top-2'
                    }`}
                />
            )}

            {!expanded && (
                <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                >
                    {text}
                </div>
            )}
        </li>
    );
}
