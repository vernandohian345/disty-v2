import { useState } from 'react';
import api from '../api/axios';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post('/login', {
                email,
                password
            });

            localStorage.setItem(
                'token',
                response.data.token
            );

            alert('Login berhasil');

            console.log(response.data);

        } catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response.data);
            alert(
                JSON.stringify(error.response.data)
            );
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    )
}