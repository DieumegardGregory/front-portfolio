import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import './ProjectsBoard.css';

const ProjectsBoard = () => {
    const formRef = useRef();
    const projectNameRef = useRef();
    const projectDescriptionRef = useRef();
    const [projectImg, setProjectImg] = useState({});
    const [projects, setProjects] = useState([]);
    const [listUpdated, setListUpdated] = useState(0);

    const getProjects = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);
            setProjects(response.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getProjects();
    }, [listUpdated])

    const handleUpload = (e) => {
        setProjectImg(e.target.files[0]);
    }

    const handleAddProject = async (e) => {
        e.preventDefault();
        const newProject = new FormData();
        newProject.append('file', projectImg);
        newProject.append('name_project', projectNameRef.current);
        newProject.append('description_project', projectDescriptionRef.current);
        console.log(newProject, e.target.files)
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/projects`,
            newProject,
            {
                withCredentials: true,
            })
            console.log(response.data)
            formRef.current.reset();
            setListUpdated(listUpdated + 1);
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleDeleteProject = async () => {
        
    }

    return (
        <>
        <HeaderAdmin entity='projets' />
        <form className="entities--form flex-around-column" ref={formRef}>
            <label htmlFor="project-name" className="admin-label">Nom du projet:<br />
                <input type="text" name="project-name" className="admin-input" onChange={(e) => {projectNameRef.current = e.target.value}} />
            </label>
            <label htmlFor="project-image" className="admin-label">Ajouter une capture d'écran<br />
                <input type="file" name="project-image" className="admin-input file-input" onChange={handleUpload} />
            </label>
            <label htmlFor="project-description" className="admin-label">Description du projet:<br />
                <textarea name="project-description" className="admin-textarea" onChange={(e) => {projectDescriptionRef.current = e.target.value}} />
            </label>
            <button type="submit" className="admin-btn" onClick={(e) => handleAddProject(e)} >Valider</button>
        </form>
        {projects.length === 0 ? null : 
        <div className="entities-list">
            {projects.map((project) => (
                <div className="element-display flex-around-row" key={project.id_project} >
                    <div>
                        {project.name_project} 
                    </div>
                    <button type="button" className="admin-btn" onClick={() => handleDeleteProject(project.id_project)}>-</button>
                </div>
            ))}
        </div>}
        </>
    )
};

export default ProjectsBoard;