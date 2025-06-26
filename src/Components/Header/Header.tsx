import { UseAuth } from '../../Context/UseAuth';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => {
    const { logout, isLoggedIn } = UseAuth();
    const navigate = useNavigate();
    const handleLoginNavigate = () => {
        navigate(`/auth/login`);
    };
    const handleSignupNavigate = () => {
        navigate(`/auth/signup`);
    };
    const handleLogout = async () => {
        logout();
    };
    const loggedIn = isLoggedIn();

    return (
        <header className="flex justify-between items-center h-16 bg-white dark:bg-zinc-800 border-b-2 sticky top-0">
            <div className="ml-14">
                <Link
                    className="text-3xl font-bold text-black dark:text-white"
                    to="/"
                >
                    Pick&Save
                </Link>
            </div>
            <nav className="flex gap-2.5 mr-5 ">
                {!loggedIn ? (
                    <>
                        <Button
                            variant="tertiary"
                            label="Log in"
                            onClick={handleLoginNavigate}
                        />
                        <Button
                            variant="tertiary"
                            label="Sign up"
                            onClick={handleSignupNavigate}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            variant="tertiary"
                            label="Logout"
                            onClick={handleLogout}
                        />
                    </>
                )}
                <div>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
};

export default Header;
