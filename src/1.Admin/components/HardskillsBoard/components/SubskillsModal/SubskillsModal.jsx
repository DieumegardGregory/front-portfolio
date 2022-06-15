import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './SubskillsModal.css';

const SubskillsModal = ({setOpenModal, hardskillId}) => {
    const formRef = useRef();
    const subskillRef = useRef('');
    const [subskills, setSubskills] = useState([]);
    const [listUpdated, setListUpdated] = useState(0);

    const handleClose = () => {
        setOpenModal(false);
    }

    const getSkillsLinked = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/subskills/linked/${hardskillId}`)
            setSubskills(response.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getSkillsLinked();
    }, [listUpdated]);

    const handleAdd = async (e) => {
        e.preventDefault();
        let newSubskill = {
            name_subskill: subskillRef.current,
            hardskill_id: hardskillId
        };
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/subskills`, newSubskill, 
            {
                withCredentials: true,
            })
            console.log(response.data)
            formRef.current.reset();
            setListUpdated(listUpdated + 1);
        } catch(err) {
            console.log(err.message);
        }
    }

    const handleDeleteSubskill = async (id) => {
        try { 
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/subskills/${id}`, 
            {
                withCredentials: true,
            })
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
        setListUpdated(listUpdated - 1);
    }

    return (
        <div className="modal-container flex-around-column">
            <button type="button" className="admin-btn" onClick={handleClose}>Fermer</button>
            <h3>Ajouter une compétence liée?</h3>
            <form className="entities--form" ref={formRef}>
                <label htmlFor="subskill" className="admin-label">Compétence :<br />   
                    <input type="text" name="subskill" className="admin-input" onChange={(e) => {subskillRef.current = e.target.value}}/>
                </label>
                <button type="submit" className="admin-btn" onClick={(e) => handleAdd(e)}>Valider</button>
            </form>
            <h4>Liste de compétences liées :</h4>
            {subskills?.length === 0 ? null : 
            <ul>
                {subskills.map((skill) => (
                    <li key={skill.id_subskill}>{skill.name_subskill}
                    <button type="button" className="admin-btn" onClick={() => handleDeleteSubskill(skill.id_subskill)}>-</button>
                    </li>
                ))}
            </ul>
}
        </div>
    )
};

export default SubskillsModal;