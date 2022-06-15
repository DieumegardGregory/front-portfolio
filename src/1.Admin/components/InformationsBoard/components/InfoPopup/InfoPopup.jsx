import React from 'react';

const InfoPopup = ({setOpenModal}) => {

    const handleClose = () => {
        setOpenModal(false);
    }

    return (
        <div className="modal-container">
            <button type="button" className="admin-btn" onClick={handleClose}>Fermer</button>
            <h3>en dev</h3>
        </div>
    )
};

export default InfoPopup;