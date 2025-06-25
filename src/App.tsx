import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './Pages/SignupPage/SignupPage';
import VerifyPage from './Pages/VerifyPage/VerifyPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import HomePage from './Pages/HomePage/HomePage';
import NotFound from './Pages/NotFound/NotFound';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import MainPage from './Pages/MainPage/MainPage';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
                <Route path="/auth/verify" element={<VerifyPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route
                    path="/main"
                    element={
                        <ProtectedRoute>
                            {' '}
                            <MainPage />{' '}
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
