import React, { useRef, useState } from 'react';
import axios from 'axios';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import InfoPopup from './components/InfoPopup/InfoPopup';
import './InformationsBoard.css';

const InformationsBoard = () => {
    const formRef = useRef();
    const profileRef = useRef('');
    const lookingForRef = useRef('');
    const [openModal, setOpenModal] = useState(false);

    const postNewInfo = async (e) => {
        e.preventDefault();
        let newInfo = {
            profile: profileRef.current,
            looking_for: lookingForRef.current
        };
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/informations`, 
            newInfo,
             {
                withCredentials: true,
            });
            if (response.data.id_information) {
                alert('Information postée avec succès');
                formRef.current.reset();
            } else {
                alert('La requête a échouée');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleInfoPopup = () => {
        setOpenModal(true);
    }

    return (
        <>
        <HeaderAdmin entity='informations' />
        {openModal ? <InfoPopup setOpenModal={setOpenModal} /> : null}
        <form className="entities--form flex-around-column" ref={formRef}>
            <label htmlFor="profile" className="admin-label"> Profil :<br />
                <textarea type="text" name="profile" className="admin-textarea" onChange={(event => {profileRef.current = event.target.value})} />
            </label>
            <label htmlFor="looking-for" className="admin-label"> Recherche :<br />
                <textarea name="looking-for" className="admin-textarea" onChange={(event => {lookingForRef.current = event.target.value})} />
            </label>
            <button type="submit" className="admin-btn" onClick={(e) => postNewInfo(e)}>Valider</button>
        </form>
        <button type="button" className="admin-btn" onClick={handleInfoPopup}>Voir les infos</button>
        </>
    )
};

export default InformationsBoard;