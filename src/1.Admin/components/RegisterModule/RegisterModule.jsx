// import React, { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// const RegisterModule = () => {
//     const formRef = useRef();
//     const emailRef = useRef('');
//     const passwordRef = useRef('');
//     const navigate = useNavigate();

//     const handleClick = async (event) => {
//         event.preventDefault();
//         const email = emailRef.current;
//         const password = passwordRef.current;
//         const response = await axios.post(`${BACKEND_URL}/api/users`, { email, password })
        
//     }

//     return (
//         <>
//             <div className="form--container flex-around-column" ref={formRef}>
//                 <h2>Enregistrement</h2>
//                 <label htmlFor="email" className="admin-label">
//                     email :<br />
//                     <input type="email" name="email" className="admin-input" onChange={(event) => {emailRef.current = event.target.value}} />
//                 </label>
//                 <label htmlFor="password" className="admin-label">
//                     password :<br />
//                     <input type="password" name="password" className="admin-input" onChange={(event) => {passwordRef.current = event.target.value}}/>
//                 </label>
//                 <button type="submit" className="admin-btn" onClick={(event) => handleClick(event)}>Enregistrer</button>

//             </div>
//         </>
//     )
// };

// export default RegisterModule;