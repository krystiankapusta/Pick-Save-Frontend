import {
    ChevronFirst,
    ChevronLast,
    MoreVertical,
    UserRound,
} from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import logo from '../../assets/logo.svg';
import { SidebarContext } from '../../Context/SidebarContext';
import Button from '../Button/Button';
import { UseAuth } from '../../Context/UseAuth';
export default function Sidebar({ children }: { children: ReactNode }) {
    const { logout } = UseAuth();
    const [expanded, setExpanded] = useState<boolean>(true);
    const handleLogout = async () => {
        logout();
    };
    return (
        <>
            <aside
                className={`bg-white shadow-md transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}
            >
                <nav className="flex flex-col h-full bg-white border-r shadow-sm">
                    <div
                        className={`flex items-center mt-4 ${expanded ? ' justify-around ' : 'justify-center'}`}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            className={`overflow-hidden transition-all ${expanded ? 'w-20' : 'w-0'}`}
                        />{' '}
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>
                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 p-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="flex flex-col justify-center items-center border-t flex p-3">
                        <div className="flex justify-center items-center">
                            <Button
                                variant="logout"
                                label={expanded ? 'Log out' : ''}
                                onClick={handleLogout}
                            />
                        </div>

                        <div
                            className={`flex w-full h-16 items-center overflow-hidden transition-all ${
                                expanded ? 'w-52 ml-3' : 'w-0'
                            }`}
                        >
                            <div
                                className={`flex  ${expanded ? 'w-1/6' : 'justify-center'}`}
                            >
                                <UserRound />
                            </div>

                            <div
                                className={`ml-3 transition-all duration-300 ${
                                    expanded
                                        ? 'opacity-100 w-full'
                                        : 'opacity-0 w-0'
                                }`}
                            >
                                <h4>Username</h4>
                            </div>
                            <div
                                className={`flex  ${expanded ? 'justify-end w-1/6' : 'w-0'}`}
                            >
                                <MoreVertical size={20} />
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}
