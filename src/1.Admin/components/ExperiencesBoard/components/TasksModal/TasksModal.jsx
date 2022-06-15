import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const TasksModal = ({setOpenModal, experienceId}) => {
    const formRef = useRef();
    const taskRef = useRef('');
    const [tasks, setTasks] = useState([]);
    const [listUpdated, setListUpdated] = useState(0);

    const handleClose = () => {
        setOpenModal(false);
    }

    const getTasksLinkedToExperience = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/linked/${experienceId}`)
            setTasks(response.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getTasksLinkedToExperience();
    }, [listUpdated]);

    const handleAdd = async (e) => {
        e.preventDefault();
        let newTask = {
            name_task: taskRef.current,
            experience_id: experienceId
        };
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`, newTask, 
            {
                withCredentials: true,
            })
            console.log(response.data);
            formRef.current.reset();
            setListUpdated(listUpdated + 1);
        } catch(err) {
            console.log(err.message);
        }
    }

    const handleDeleteTask = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${id}`, 
            {
                withCredentials: true,
            })
            console.log(response.data);
            setListUpdated(listUpdated - 1);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="modal-container flex-around-column">
            <button type="button" className="admin-btn" onClick={handleClose}>Fermer</button>
            <h3>Ajouter une mission liée?</h3>
            <form className="entities--form" ref={formRef}>
                <label htmlFor="task" className="admin-label"> Mission liée:<br />   
                    <input type="text" name="task" className="admin-input" onChange={(e) => {taskRef.current = e.target.value}}/>
                </label>
                <button type="submit" className="admin-btn" onClick={(e) => handleAdd(e)}>Valider</button>
            </form>
            <h4>Liste de missions liées :</h4>
            {tasks?.length === 0 ? null : 
            <ul>
                {tasks.map((task) => (
                    <li key={task.id_task}>{task.name_task}
                    <button type="button" className="admin-btn" onClick={() => handleDeleteTask(task.id_task)}>-</button>
                    </li>
                ))}
            </ul>
}
        </div>
    )
};

export default TasksModal;