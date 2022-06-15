import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import TasksModal from './components/TasksModal/TasksModal';
import './ExperiencesBoard.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ExperiencesBoard = () => {
    const formRef = useRef();
    const posteRef = useRef('');
    const companyRef = useRef('');
    const startingYearRef = useRef('');
    const endingYearRef = useRef('');
    const [experiences, setExperiences] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [experienceId, setExperienceId] = useState(0);

    const getExperiences = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/experiences`)
            setExperiences(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getExperiences();
    }, []);

    const postNewExperience = async (e) => {
        e.preventDefault();
        let newExperience = {
            name_experience: posteRef.current,
            place_experience: companyRef.current,
            starting_year: startingYearRef.current,
            ending_year: endingYearRef.current,
        };
        try {
            const response = await axios.post(`${BACKEND_URL}/api/experiences`, newExperience, {
                withCredentials: true,
            })
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
        formRef.current.reset();
        getExperiences();
    }

    const handleAddTask = (id) => {
        setExperienceId(id);
        setOpenModal(true);
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/experiences/${id}`, 
            {
                withCredentials: true,
            });
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
        getExperiences();
    }

    return (
        <>
        <HeaderAdmin entity='expériences' />
        {openModal ? <TasksModal setOpenModal={setOpenModal} experienceId={experienceId} /> : null}
        <form className="entities--form flex-around-column" ref={formRef}>
            <label htmlFor="poste" className="admin-label"> Poste occupé :<br />
                <input type="text" name="poste" className="admin-input" onChange={(event => {posteRef.current = event.target.value})} />
            </label>
            <label htmlFor="entreprise" className="admin-label"> Nom de l'entreprise :<br />
                <input type="text" name="entreprise" className="admin-input" onChange={(event => {companyRef.current = event.target.value})}/>
            </label>
            <label htmlFor="année-début" className="admin-label"> Année de début :<br />
                <input type="number" name="année-début" className="admin-input" onChange={(event => {startingYearRef.current = event.target.value})}/>
            </label>
            <label htmlFor="année-fin" className="admin-label"> Année de fin :<br />
                <input type="number" name="année-fin" className="admin-input" onChange={(event => {endingYearRef.current = event.target.value})}/>
            </label>
            <button type="submit" className="admin-btn" onClick={(e) => postNewExperience(e)}>Valider</button>
        </form>
        {experiences.length === 0 ? null : 
            <div className="entities-list">
                {experiences.map((experience) => (
                    <div className="element-display grid-60-40" key={experience.id_experience}>
                        <div className="infos-container" >
                            {experience.name_experience} {experience.place_experience}
                        </div>
                        <div className="btns-container">
                            <button type="button add-btn" className="admin-btn" onClick={() => handleAddTask(experience.id_experience)}>+</button>
                            <button type="button delete-btn" className="admin-btn" onClick={() => handleDelete(experience.id_experience)}>-</button>
                        </div>
                    </div>
                ))}
            </div>}
        </>
    )
};

export default ExperiencesBoard;