import { UseAuth } from '../../Context/UseAuth';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const Header = () => {
    const { logout, isLoggedIn } = UseAuth();
    const handleLogout = async () => {
        logout();
    };
    const loggedIn = isLoggedIn();

    return (
        <header className="flex justify-between items-center h-20 bg-purple-500 border-b-2">
            <div className="ml-14">
                <Link className="text-3xl font-bold text-white" to="/Pick-Save">
                    Pick&Save
                </Link>
            </div>
            <nav className="flex gap-2.5 mr-5">
                {!loggedIn ? (
                    <></>
                ) : (
                    <>
                        <Button
                            variant="tertiary"
                            label="Logout"
                            onClick={handleLogout}
                        />
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
