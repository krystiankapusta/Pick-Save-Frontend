import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './Pages/SignupPage/SignupPage';
import VerifyPage from './Pages/VerifyPage/VerifyPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import HomePage from './Pages/HomePage/HomePage';

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth/signup" element={<SignupPage />} />
                <Route path="/auth/verify" element={<VerifyPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/Pick-Save" element={<HomePage />} />
            </Routes>
        </>
    );
}

export default App;
