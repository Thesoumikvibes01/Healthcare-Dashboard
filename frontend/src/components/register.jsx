//frontednd/src/components/register.jsx
import  { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({ username, password });
            // console.log(response.data)
            alert(response.data.message);
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.errors
            ? error.response.data.errors.map(err => err.msg).join(", ")
            : "An error occurred. Please try again.";
            alert(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
