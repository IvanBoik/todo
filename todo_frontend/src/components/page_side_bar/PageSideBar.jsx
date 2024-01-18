import React from 'react';
import {NavLink} from "react-router-dom";
import './style.css';
import logo from '../../images/todo-list-svgrepo-com.svg';

const PageSideBar = () => {
    return (
        <div className="page-side-bar-container">
            <img src={logo} alt="" className="logo"/>
            <NavLink to="/profile" className="link">Профиль</NavLink>
            <NavLink to="/all" className="link">Все задачи</NavLink>
            <NavLink to="/today" className="link">Сегодня</NavLink>
            <NavLink to="/logs" className="link">Логи</NavLink>
        </div>
    );
};

export default PageSideBar;