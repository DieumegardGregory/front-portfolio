import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Menu.css";

const Menu = () => {

    const menuTabs = [
        {
            id: 1,
            name: "experiences",
            path: "/admin/experiences"

        },
        {
            id: 2,
            name: "formations",
            path: "/admin/formations"
        },
        {
            id: 3,
            name: "hardskills",
            path: "/admin/hardskills"
        },
        {
            id: 4,
            name: "softskills",
            path: "/admin/softskills"
        },
        {
            id: 5,
            name: "informations",
            path: "/admin/informations"
        },
        {
            id: 6,
            name: "projects",
            path: "/admin/projects"
        }
    ]
    return (
        <div className="menu--page flex-around-column">
            <h2>Menu</h2>
            <ul className="menu-list flex-around-column">
                {menuTabs.map((tab) => (
                    <NavLink to={tab.path} className="menu-link" key={tab.id}>
                        <li key={tab.id} className="menu-item flex-center-row">{tab.name}</li>    
                    </NavLink>
                ))}
            </ul>
        </div>
    )
};

export default Menu;