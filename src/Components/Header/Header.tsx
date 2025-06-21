import { UseAuth } from '../../Context/UseAuth';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Header.css';
const Header = () => {
    const { logout, isLoggedIn } = UseAuth();
    const handleLogout = async () => {
        logout();
    };
    const loggedIn = isLoggedIn();

    return (
        <header className="header">
            <div className="header-left">
                <Link className="custom-link" to="/Pick-Save">
                    Pick&Save
                </Link>
            </div>
            <nav className="header-right">
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
