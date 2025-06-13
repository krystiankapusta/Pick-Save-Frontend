import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './Pages/SignupPage/SignupPage';
import VerifyPage from './Pages/VerifyPage/VerifyPage';

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth/signup" element={<SignupPage />} />
                <Route path="/auth/verify" element={<VerifyPage />} />
            </Routes>
        </>
    );
}

export default App;
