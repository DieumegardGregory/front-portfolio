import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const FormationsBoard = () => {
    const formRef = useRef();
    const nameRef = useRef('');
    const placeRef = useRef('');
    const yearRef = useRef('');
    const schoolRef = useRef('');
    const [formations, setFormations] = useState([]);

    const getFormations = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/formations`)
            setFormations(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getFormations();
    }, []);

    const postNewFormation = async (e) => {
        e.preventDefault();
        let newFormation = {
            name_formation: nameRef.current,
            place_formation: placeRef.current,
            year_formation: yearRef.current,
            school: schoolRef.current,
        };
        try {
            const response = await axios.post(`${BACKEND_URL}/api/formations`, newFormation,
            {
                withCredentials: true,
            } 
            )
            console.log(response)
        } catch (err) {
            console.log(err)
        }
        formRef.current.reset();
        getFormations();
    }

    return (
        <>
        <HeaderAdmin entity='formations' />
        <form className="entities--form flex-around-column" ref={formRef}>
            <label htmlFor="name" className="admin-label"> Nom de la formation :<br />
                <input type="text" name="name" className="admin-input" onChange={(event => {nameRef.current = event.target.value})} />
            </label>
            <label htmlFor="place" className="admin-label"> Lieu de la formation :<br />
                <input type="text" name="place" className="admin-input" onChange={(event => {placeRef.current = event.target.value})}/>
            </label>
            <label htmlFor="year" className="admin-label"> Année :<br />
                <input type="number" name="year" className="admin-input" onChange={(event => {yearRef.current = event.target.value})}/>
            </label>
            <label htmlFor="school" className="admin-label"> Organisme :<br />
                <input type="text" name="school" className="admin-input" onChange={(event => {schoolRef.current = event.target.value})}/>
            </label>
            <button type="submit" className="admin-btn" onClick={(e) => postNewFormation(e)}>Valider</button>
        </form>
        {formations.length === 0 ? null : 
            <div className="entities-list">
                {formations.map((formation) => (
                    <div className="element-display grid-60-40" key={formation.id_formation}>
                        <div className="infos-container" >
                            {formation.name_formation} {formation.place_formation}
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

export default FormationsBoard;