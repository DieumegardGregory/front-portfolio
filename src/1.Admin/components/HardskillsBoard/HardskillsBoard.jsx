import React, { useRef, useState, useEffect } from 'react';
import SubskillsModal from './components/SubskillsModal/SubskillsModal';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const HardskillsBoard = () => {
    const formRef = useRef();
    const hardskillRef = useRef('');
    const [hardskills, setHardskills] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [hardskillId, setHardskillId] = useState(0);

    const getHardskills = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/hardskills`)
            setHardskills(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getHardskills();
    }, []);

    const postNewHardskill = async (e) => {
        e.preventDefault();
        let newHardskill = {
            name_hardskill: hardskillRef.current,
        };
        try {
            const response = await axios.post(`${BACKEND_URL}/api/hardskills`, newHardskill,
            {
                withCredentials: true,
            } 
            )
            console.log(response)
        } catch (err) {
            console.log(err)
        }
        formRef.current.reset();
        getHardskills();
    }

    const handleAddSubskill = (id) => {
        setHardskillId(id);
        setOpenModal(true);
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/hardskills/${id}`, {
                withCredentials: true,
            })
            console.log(response);
        } catch (err) {
            console.log(err.message);
        }
        getHardskills();
    }

    return (
        <>
        <HeaderAdmin entity='hardskills' />
        {openModal ? <SubskillsModal setOpenModal={setOpenModal} hardskillId={hardskillId} /> : null}
        <form className="entities--form flex-around-column" ref={formRef}>
            <label htmlFor="name" className="admin-label"> Hardskill :<br />
                <input type="text" name="name" className="admin-input" onChange={(event => {hardskillRef.current = event.target.value})} />
            </label>
            <button type="submit" className="admin-btn" onClick={(e) => postNewHardskill(e)}>Valider</button>
        </form>
        {hardskills.length === 0 ? null : 
            <div className="entities-list">
                {hardskills.map((hardskill) => (
                    <div className="element-display grid-60-40" key={hardskill.id_hardskill}>
                        <div className="infos-container" >
                            {hardskill.name_hardskill}
                        </div>
                        <div className="btns-container">
                            <button type="button add-btn" className="admin-btn" onClick={() => handleAddSubskill(hardskill.id_hardskill)}>+</button>
                            <button type="button delete-btn" className="admin-btn" onClick={() => handleDelete(hardskill.id_hardskill)}>-</button>
                        </div>
                    </div>
                ))}
            </div>}
        </>
    )
};

export default HardskillsBoard;