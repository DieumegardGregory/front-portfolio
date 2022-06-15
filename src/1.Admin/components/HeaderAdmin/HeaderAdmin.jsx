import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderAdmin.css';

const HeaderAdmin = ({ entity }) => {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate('/admin/1')
    }

    return (
        <div className="header-container flex-around-row">
            <button type="button" className="admin-btn return-btn" onClick={handleReturn}>x</button>
            <h3>Board {entity}</h3>
        </div>
    )
};

export default HeaderAdmin;