import React , {useState} from 'react';
import {NavLink} from "react-router-dom";
import "./style.css";
import UserController from "../../api/UserController";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const handleLogin = async () => {
        if (email === "" || password === "") {
            alert("Некорректные логин и/или пароль");
        }
        else {
            let response = await UserController.login(email, password);
            localStorage.setItem("todoUser", JSON.stringify(response.data));
        }
    };

    const handleRegistration = async () => {
        if (name === "" || email === "" || password === "" || repeatedPassword === "") {
            alert("Поля не должны быть путыми");
        }
        else if (password !== repeatedPassword) {
            alert("Пароли не совпадают");
        }
        else {
            let response = await UserController.registration(name, email, password);
            localStorage.setItem("todoUser", JSON.stringify(response.data));
        }
    };

    const buttons = (
        <div className="switch-buttons">
            <button className="switch-button"
                    style={{
                        fontSize: isLogin ? "20px" : "16px",
                        background: isLogin ? "antiquewhite" : "white",
                        border: isLogin ? "none" : "solid 1px black"
                    }}
                    onClick={() => setIsLogin(true)}>
                Вход</button>
            <button className="switch-button"
                    style={{
                        fontSize: !isLogin ? "20px" : "16px",
                        background: !isLogin ? "antiquewhite" : "white",
                        border: !isLogin ? "none" : "solid 1px black"
                    }}
                    onClick={() => setIsLogin(false)}>
                Регистрация</button>
        </div>
    );

    const loginBlock = (
        <div className="login-block">
            {buttons}
            <div className="login-inputs">
                <div className="input-with-label">
                    <label htmlFor="login-email-input" className="input-label">Email: </label>
                    <input type="text" className="auth-page-input" id="login-email-input"
                           onChange={(x) => {
                               setEmail(x.target.value)
                           }}/>
                </div>
                <div className="input-with-label">
                    <label htmlFor="login-password-input" className="input-label">Пароль: </label>
                    <input type="password" className="auth-page-input" id="login-password-input"
                           onChange={(x) => {
                               setPassword(x.target.value)
                           }}/>
                </div>
            </div>
            <NavLink className="login-button" to="/today" onClick={() => handleLogin()}>
                Войти
            </NavLink>
        </div>
    );

    const registrationBlock = (
        <div className="login-block">
            {buttons}
            <div className="reg-inputs">
                <div className="input-with-label">
                    <label htmlFor="login-name-input" className="input-label">Имя: </label>
                    <input type="text" className="auth-page-input" id="login-name-input"
                           onChange={(x) => {
                               setName(x.target.value)
                           }}/>
                </div>
                <div className="input-with-label">
                    <label htmlFor="login-email-input" className="input-label">Email: </label>
                    <input type="text" className="auth-page-input" id="login-email-input"
                           onChange={(x) => {
                               setEmail(x.target.value)
                           }}/>
                </div>
                <div className="input-with-label">
                    <label htmlFor="login-password-input" className="input-label">Пароль: </label>
                    <input type="password" className="auth-page-input" id="login-password-input"
                           onChange={(x) => {
                               setPassword(x.target.value)
                           }}/>
                </div>
                <div className="input-with-label">
                    <label htmlFor="login-rep-password-input" className="input-label"
                           style={{}}
                    >Повторите пароль: </label>
                    <input type="password" className="auth-page-input" id="login-rep-password-input"
                           onChange={(x) => {
                               setRepeatedPassword(x.target.value)
                           }}/>
                </div>
            </div>
            <NavLink className="reg-button" to="/today" onClick={() => handleRegistration()}>
                Войти
            </NavLink>
        </div>
    );

    return (
        <div className="auth-page-container">
            {isLogin
                ? loginBlock
                : registrationBlock
            }
        </div>
    );
};

export default AuthPage;