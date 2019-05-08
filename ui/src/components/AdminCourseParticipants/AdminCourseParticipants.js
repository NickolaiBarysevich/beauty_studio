import React from 'react'
import AdminUserView from '../AdminUserView/AdminUserView'

const AdminCourseParticipants = ({participants}) => {
    const userModals = participants.map(participant =>
        <AdminUserView user={participant} id={"participantView-" + participant.id}/>
    );
    const userLinks = participants.map(participant =>
        <a className="dropdown-item" href="#" data-toggle="modal"
           data-target={"#participantView-" + participant.id}>{participant.username}</a>
    );
    return (
        <div className="dropdown">
            {userModals.length !== 0
                ? userModals
                : ""}
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Участники
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {userLinks.length !== 0
                    ? userLinks
                    : <span>Участников нет</span>}
            </div>
        </div>
    )

};

export default AdminCourseParticipants;