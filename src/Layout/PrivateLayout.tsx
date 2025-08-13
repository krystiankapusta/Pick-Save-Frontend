import Sidebar from '../Components/Sidebar/Sidebar';
import { SidebarItem } from '../Components/SidebarItem/SidebarItem';
import { CirclePlus, House, ShoppingBasket } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar>
                <SidebarItem icon={<House />} text="Home" to="/main" />
                <SidebarItem
                    icon={<CirclePlus />}
                    text="Add product"
                    to="/products/create"
                />
                <SidebarItem
                    icon={<ShoppingBasket />}
                    text="Products"
                    to="/products/display-all"
                />
            </Sidebar>
            <main className="flex-1 p-6 bg-gray-100 dark:bg-zinc-800">
                <Outlet />
            </main>
        </div>
    );
};

export default PrivateLayout;
