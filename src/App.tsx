import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignupForm from './Components/Forms/SignupForm';

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth/signup" element={<SignupForm />} />
            </Routes>
        </>
    );
}

export default App;
