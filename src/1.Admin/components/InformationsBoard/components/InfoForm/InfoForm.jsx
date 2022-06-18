import React from 'react';

const InfoForm = ( { title, formRef, submitInfo, profileRef, lookingForRef, interestsRef, setOpenModifyInfo, setInfoId } ) => {


    const handleCloseModify = () => {
        setOpenModifyInfo(false);
        setInfoId(0);
        formRef.current.reset();
    }
console.log(profileRef, profileRef.current, profileRef.current.value)
    return (
        <form className="entities--form flex-around-column" ref={formRef}>
            {title === 'Modifier' ? <>{title} <button type="button" className="admin-btn" onClick={handleCloseModify}>Fermer</button> </>  : <>{title}</> }
            <label htmlFor="profile" className="admin-label"> Profil :<br />
                <textarea type="text" name="profile" className="admin-textarea" ref={profileRef} onChange={(event) => {profileRef.current.value = event.target.value}} />
            </label>
            <label htmlFor="looking-for" className="admin-label"> Recherche :<br />
                <textarea name="looking-for" className="admin-textarea" ref={lookingForRef} onChange={(event) => {lookingForRef.current.value = event.target.value}} />
            </label>
            <label htmlFor="interests" className="admin-label"> Intérêts :<br />
                <textarea name="interests" className="admin-textarea" ref={interestsRef} onChange={(event) => {interestsRef.current.value = event.target.value}} />
            </label>
            <button type="submit" className="admin-btn" onClick={(e) => submitInfo(e)}>Valider</button>
        </form>
    )
}

export default InfoForm;