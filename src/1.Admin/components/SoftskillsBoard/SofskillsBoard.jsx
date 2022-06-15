import React, { useRef, useState, useEffect } from 'react';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SoftskillsBoard = () => {
    const formRef = useRef();
    const softskillRef = useRef('');
    
    const [softskills, setSoftskills] = useState([]);

    const getSoftskills = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/softskills`)
            setSoftskills(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSoftskills();
    }, []);

    const postNewSoftskill = async (e) => {
        e.preventDefault();
        let newSoftskill = {
            name_softskill: softskillRef.current,
        };
        try {
            const response = await axios.post(`${BACKEND_URL}/api/softskills`, newSoftskill,
            {
                withCredentials: true,
            } 
            )
            console.log(response)
        } catch (err) {
            console.log(err)
        }
        formRef.current.reset();
        getSoftskills();
    }

    return (
        <>
        <HeaderAdmin entity='softskills' />
        <form className="entities--form flex-around-column" ref={formRef}>
            <label htmlFor="name" className="admin-label"> Softskill :<br />
                <input type="text" name="name" className="admin-input" onChange={(event => {softskillRef.current = event.target.value})} />
            </label>
            <button type="submit" className="admin-btn" onClick={(e) => postNewSoftskill(e)}>Valider</button>
        </form>
        {softskills.length === 0 ? null : 
            <div className="entities-list">
                {softskills.map((softskill) => (
                    <div className="element-display grid-60-40" key={softskill.id_softskill}>
                        <div className="infos-container" >
                            {softskill.name_softskill}
                        </div>
                        <div className="btns-container">
                            <button type="button add-btn" className="admin-btn">+</button>
                            <button type="button delete-btn" className="admin-btn">-</button>
                        </div>
                    </div>
                ))}
            </div>}
        </>
    )
};

export default SoftskillsBoard;