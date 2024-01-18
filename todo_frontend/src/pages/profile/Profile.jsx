import React , {useState} from 'react';
import PageSideBar from "../../components/page_side_bar/PageSideBar";
import './style.css';
import {NavLink} from "react-router-dom";
import UserController from "../../api/UserController";

const Profile = () => {
    let user = JSON.parse(localStorage.getItem("todoUser"));

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isEdit, setIsEdit] = useState(false);
    const [whatIsEdit, setWhatIsEdit] = useState("");

    const handleEdit = async () => {
        let response = null;
        if (name !== user.name || email !== user.email) {
            try {
                response = await UserController.updateNameAndEmail(user.id, name, email);
            }
            catch (e) {
                alert("Неверный формат ввода или пользователь с таким email уже существует");
            }
        }
        if (oldPassword !== "" && oldPassword !== user.password) {
            alert("Неверный пароль");
        }
        else if (oldPassword !== "" && newPassword === "") {
            alert("Новый пароль не может быть пустым");
        }
        else if (oldPassword !== "" && oldPassword === user.password && newPassword !== "") {
            response = await UserController.updatePassword(user.id, oldPassword, newPassword);
        }

        if (response !== null) {
            localStorage.setItem("todoUser", JSON.stringify(response.data));
            setName(response.data.name);
            setEmail(response.data.email);
        }
        setOldPassword("");
        setNewPassword("");
        setIsEdit(false);
    };

    return (
        <div className="profile-page-container">
            <PageSideBar/>
            <div className="profile-page-without-side-bar">
                <div className="profile-value-and-label">
                    <p className="profile-label">Имя: </p>
                    {isEdit && whatIsEdit === "data"
                        ? <input type="text" className="profile-input"
                                 value={name}
                                 onChange={(x) => setName(x.target.value)}/>
                        : <p className="profile-value">{name}</p>
                    }
                </div>
                <div className="profile-value-and-label">
                    <p className="profile-label">Email: </p>
                    {isEdit && whatIsEdit === "data"
                        ? <input type="text" className="profile-input"
                                 value={email}
                                 onChange={(x) => setEmail(x.target.value)}/>
                        : <p className="profile-value">{email}</p>
                    }
                </div>
                <div className="profile-value-and-label">
                    {isEdit && whatIsEdit === "password"
                        ? <>
                            <p className="old_password">Старый пароль: </p>
                            <input type="password" className="profile-input"
                                   onChange={(x) => setOldPassword(x.target.value)}/>
                            <p className="old_password">Новый пароль: </p>
                            <input type="password" className="profile-input"
                                 onChange={(x) => setNewPassword(x.target.value)}/>
                        </>
                        : <>
                            <p className="profile-label">Пароль: </p>
                            <p className="profile-value">{'*'.repeat(user.password.length)}</p>
                        </>
                    }
                </div>
                {isEdit
                    ? <div style={{display: "flex"}}>
                        <button className="cancel-edit-profile"
                                onClick={() => {
                                    setName(user.name);
                                    setEmail(user.email);
                                    setIsEdit(false);
                                }}>
                            Отмена
                        </button>
                        <button className="save-edit-profile"
                                onClick={() => handleEdit()}
                        >Сохранить
                        </button>
                    </div>
                    : <div className="edit-buttons-block">
                        <button className="edit-profile"
                                onClick={() => {
                                    setWhatIsEdit("password");
                                    setIsEdit(true);
                                }}>
                            Изменить пароль</button>
                        <button className="edit-profile"
                                onClick={() => {
                                    setWhatIsEdit("data");
                                    setIsEdit(true);
                                }}>
                            Изменить другие данные</button>
                    </div>
                }
                <NavLink className="logout" to="/"
                         onClick={() => localStorage.removeItem("todoUser")}
                >Выйти</NavLink>
            </div>
        </div>
    );
};

export default Profile;