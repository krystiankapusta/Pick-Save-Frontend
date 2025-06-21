import Button from '../../Components/Button/Button';
import { UseAuth } from '../../Context/UseAuth';

const HomePage = () => {
    const { logout } = UseAuth();

    const handleLogout = async () => {
        logout();
    };
    return (
        <div>
            <section>
                <h2>Welcome at Pick&Save hehehehe</h2>
                <Button
                    onClick={handleLogout}
                    type="submit"
                    variant="primary"
                    label="Logout"
                ></Button>
            </section>
        </div>
    );
};

export default HomePage;
