import savings from '../../assets/savings.svg';
import groceries_list from '../../assets/groceries_list.svg';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const handleSignupNavigate = () => {
        navigate(`/auth/signup`);
    };

    return (
        <section className="flex min-h-screen justify-center w-full bg-white-">
            <div className="flex flex-col items-center justify-center max-w-7xl gap-10 p-1">
                <div className="flex w-full bg-blue-100 shadow-lg rounded-xl">
                    <div className="flex flex-col justify-center w-full md:w-1/2 p-10 gap-4">
                        <h2 className="text-xl md:text-3xl lg:text-5xl font-bold">
                            Smarter Shopping. Bigger Savings.
                        </h2>
                        <p className="text-sm md:text-base text-gray-600">
                            Discover smart shopping tool and make every dollar
                            count with Pick&Save.
                        </p>
                        <div className="flex justify-center items-center p-2">
                            <Button
                                variant="primary"
                                label="Start saving"
                                onClick={handleSignupNavigate}
                            />
                        </div>
                    </div>
                    <div className="hidden md:flex md:w-1/2 justify-center items-center">
                        <img
                            alt="Savings"
                            src={savings}
                            className="md:w-40 md:h-40 lg:w-60 lg:h-60 object-contain"
                        />
                    </div>
                </div>
                <div className="flex w-full bg-red-100 shadow-lg rounded-xl">
                    <div className="flex flex-col justify-center w-full md:w-1/2 p-10 gap-4">
                        <h2 className="text-xl md:text-3xl lg:text-5xl font-bold">
                            The Grocery List That Plans Itself
                        </h2>
                        <p className="text-sm md:text-base text-gray-600">
                            Create, edit, and manage your shopping list in
                            seconds. Sync across devices and never forget an
                            item again.
                        </p>
                    </div>
                    <div className="hidden md:flex md:w-1/2 justify-center items-center">
                        <img
                            alt="Savings"
                            src={groceries_list}
                            className="md:w-40 md:h-40 lg:w-60 lg:h-60 object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
