import Header from '../Components/Header/Header';
import type { ReactNode } from 'react';
import Footer from '../Components/Footer/Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
