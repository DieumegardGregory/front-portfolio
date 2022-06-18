import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import InfoForm from './components/InfoForm/InfoForm';
import './InformationsBoard.css';

const InformationsBoard = () => {
    const formRef = useRef();
    const profileRef = useRef('');
    const lookingForRef = useRef('');
    const interestsRef = useRef('');
    const [infos, setInfos] = useState([]);
    const [listUpdated, setListUpdated] = useState(0);
    const [openModifyInfo, setOpenModifyInfo] = useState(false);
    const [infoId, setInfoId] = useState(0);

    

    useEffect(() => {
        const getInfos = async () => {
            if (infoId !== 0) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/informations/${infoId}`);
                    profileRef.current.value = response.data.profile;
                    lookingForRef.current.value = response.data.looking_for;
                    interestsRef.current.value = response.data.interests;
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/informations`);
                    setInfos(response.data);
                } catch (err) {
                    console.log(err.message);
                }
            }
        }
        getInfos();
    }, [listUpdated, infoId])

    const submitInfo = async (e) => {
        e.preventDefault();
        let newInfo = {
            profile: profileRef.current.value,
            looking_for: lookingForRef.current.value,
            interests: interestsRef.current.value
        };

        if (infoId !== 0) {
            try {
                console.log('newinfo', newInfo)
                const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/informations/${infoId}`,
                newInfo,
                {
                    withCredentials: true,
                })
                console.log(response.data);
            } catch (err) {
                console.log(err.message);
            }
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/informations`, 
                newInfo,
                 {
                    withCredentials: true,
                });
                if (response.data.id_information) {
                    alert('Information postée avec succès');
                    setListUpdated(listUpdated + 1);
                    formRef.current.reset();
                } else {
                    alert('La requête a échouée');
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        formRef.current.reset();
        setOpenModifyInfo(false);
        setInfoId(0);
    }

    const handleCatchInfo = (id) => {
        setOpenModifyInfo(true);
        setInfoId(id)
    }

    return (
        <>
        <HeaderAdmin entity='informations' />
        
        {openModifyInfo ? 
        <InfoForm
        title='Modifier' 
        formRef={formRef}
        setOpenModifyInfo={setOpenModifyInfo}
        profileRef={profileRef} 
        lookingForRef={lookingForRef} 
        interestsRef={interestsRef}  
        setInfoId={setInfoId}
        submitInfo={submitInfo}
        /> : 
        <InfoForm
        title='Ajouter' 
        formRef={formRef} 
        submitInfo={submitInfo} 
        profileRef={profileRef} 
        lookingForRef={lookingForRef} 
        interestsRef={interestsRef} 
        />}
        {infos?.map((info) => (
            <div className="element-display grid-60-40" key={info.id_information} >
                <p>Informations No : {info.id_information}</p>
                    <button type="button" className="admin-btn" onClick={() => handleCatchInfo(info.id_information)}>Voir</button>
            </div>
        ))}
        </>
    )
};

export default InformationsBoard;