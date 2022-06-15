import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginModule.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const LoginModule = () => {
    const formRef = useRef();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();
        const email = emailRef.current;
        const password = passwordRef.current;
        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/login`, 
            { email, password }, 
            {
                withCredentials: true,
            })
            if (response.data.id) {
                navigate(`/admin/${response.data.id}`);
            } else {
                formRef.current.reset();
                alert('wrong credentials');
            }

        } catch(err) {
            console.log(err)
        }
    }
    
    return (
        <>
            <div className="form--container flex-around-column" ref={formRef}>
                <h2>Connexion</h2>
                <label htmlFor="email" className="admin-label">
                    email :<br />
                    <input type="email" name="email" className="admin-input" onChange={(event) => {emailRef.current = event.target.value}} />
                </label>
                <label htmlFor="password" className="admin-label">
                    password :<br />
                    <input type="password" name="password" className="admin-input" onChange={(event) => {passwordRef.current = event.target.value}}/>
                </label>
                <button type="submit" className="admin-btn" onClick={(event) => handleClick(event)}>Se connecter</button>

            </div>
        </>
    )
};

export default LoginModule;