import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { UseAuth } from '../../Context/UseAuth';

const NotFound = () => {
    const { isLoggedIn } = UseAuth();
    const navigate = useNavigate();
    const loggedIn = isLoggedIn();
    const handleHomeNavigation = () => {
        navigate(`/`);
    };
    const handleMainNavigation = () => {
        navigate(`/main`);
    };
    return (
        <div className="min-h-screen flex justify-center items-center w-full bg-white dark:bg-zinc-800">
            <div className="flex  shadow-lg rounded-xl bg-gray-100 dark:bg-zinc-500 p-6">
                <div className="flex flex-col justify-center items-center p-6 gap-5">
                    <h1 className="text-8xl font-bold  mb-6">404</h1>
                    <h2 className="text-2xl text-gray-400 dark:text-gray-300 font-bold mb-2">
                        Page Not Found
                    </h2>
                    <p className="">
                        Oops! The page you're looking for doesn't exist or has
                        been moved.
                    </p>
                    <div className="mt-3">
                        {!loggedIn ? (
                            <Button
                                variant="primary"
                                label="Back to Home"
                                onClick={handleHomeNavigation}
                            />
                        ) : (
                            <Button
                                variant="primary"
                                label="Back to Main"
                                onClick={handleMainNavigation}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
