import Sidebar from '../Components/Sidebar/Sidebar';
import { SidebarItem } from '../Components/SidebarItem/SidebarItem';
import { CirclePlus, House, ShoppingBasket } from 'lucide-react';
type PrivateLayoutProps = {
    children: React.ReactNode;
};

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar>
                <SidebarItem icon={<House />} text="Home" />
                <SidebarItem icon={<CirclePlus />} text="Add product" />
                <SidebarItem
                    icon={<ShoppingBasket />}
                    text="Products"
                    to="/products/display-all"
                />
            </Sidebar>
            <main className="flex-1 p-6 bg-gray-100 dark:bg-zinc-800">
                {children}
            </main>
        </div>
    );
};

export default PrivateLayout;
