import React , {useContext , useEffect , useState} from 'react';
import trashIcon from "../../images/trash-svgrepo-com.svg";
import editIcon from "../../images/edit-2-svgrepo-com.svg";
import TaskController from "../../api/TaskController";
import {CreateAndUpdateContext} from "../../context";

const Task = (props) => {
    const {
        isTaskUpdatingCtx,
        setIsTaskUpdatingCtx,
        isTaskCreatingCtx,
        setIsTaskCreatingCtx,
        updatingTaskIDCtx,
        setUpdatingTaskIDCtx
    } = useContext(CreateAndUpdateContext);

    let user = JSON.parse(localStorage.getItem("todoUser"));

    const [isDone, setIsDone] = useState(props.task.done);
    const [title, setTitle] = useState(props.task.title);
    const [description, setDescription] = useState(props.task.description);
    const [deadlineDate, setDeadlineDate] = useState(props.task.deadlineDate);
    const [deadlineTime, setDeadlineTime] = useState(props.task.deadlineTime);
    const [priority, setPriority] = useState(props.task.priority);

    const handlePriority = (p) => {
        if (p === 4) {
            return "gray";
        }
        else if (p === 3) {
            return "blue";
        }
        else if (p === 2) {
            return "orange";
        }
        else {
            return "red";
        }
    };

    const handleDescription = (description) => {
        if (description?.length > 50) {
            return description.substring(0, 50) + "..."
        }
        else {
            return description
        }
    };

    const handleDelete = async () => {
        props.setTask(
            prevTasks =>
                prevTasks.filter(x =>
                    x.id !== props.task.id
                )
        );
        await TaskController.deleteTask(props.task.id)
    }

    const handleUpdate = async () => {
        let task = {
            id: props.task.id,
            title,
            description,
            deadlineDate,
            deadlineTime,
            priority
        }
        await TaskController.updateTask(task);
        props.setTask(prevTasks =>
            prevTasks.map(x =>
                x.id === task.id ? task: x
            )
        );
    };

    const updateForm = (
        <div className="add-task-form">
            <input type="text" className="add-task-input-title" placeholder="Название задачи"
                   value={title}
                   onChange={x => setTitle(x.target.value)}
            />
            <input type="text" className="add-task-input-description" placeholder="Описание"
                   value={description}
                   onChange={x => setDescription(x.target.value)}
            />
            <div className="add-task-extra-params">
                <input type="date" className="add-task-input-date"
                       value={deadlineDate}
                       onChange={x => setDeadlineDate(x.target.value)}/>
                <input type="time" className="add-task-input-date"
                       value={deadlineTime}
                       onChange={x => {
                           const value = x.target.value;
                           if (value) {
                               let date = new Date()
                               let parts = x.target.value.split(":")
                               date.setHours(parts[0], parts[1], 0)
                               setDeadlineTime(date)
                           }
                       }}/>
                <select className="add-task-input-priority"
                        value={priority}
                        onChange={x => setPriority(x.target.value)}>
                    <option value="1">Приоритет 1</option>
                    <option value="2">Приоритет 2</option>
                    <option value="3">Приоритет 3</option>
                    <option value="4">Приоритет 4</option>
                </select>
            </div>
            <div className="add-task-form-buttons">
                <button className="add-task-form-button"
                        onClick={() => {
                            setTitle(props.task.title);
                            setDescription(props.task.description);
                            setDeadlineDate(props.task.deadlineDate);
                            setDeadlineTime(props.task.deadlineTime);
                            setPriority(props.task.priority);
                            setIsTaskUpdatingCtx(false);
                        }}
                >Отмена</button>
                <button className="add-task-form-button"
                        disabled={title === ""}
                        onClick={() => {
                            handleUpdate();
                            setUpdatingTaskIDCtx(0);
                            setIsTaskUpdatingCtx(false);
                        }}
                >Сохранить</button>
            </div>
        </div>
    );

    const handleDeadline = () => {
        if (deadlineDate === null) {
            return "green";
        }
        if (deadlineTime === null) {
            let dateParts = deadlineDate.split("-");
            let deadline = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            if (new Date() > deadline) {
                return "red";
            }
            else {
                return "green";
            }
        }
        let timeParts = deadlineTime.split(":");
        let dateParts = deadlineDate.split("-");
        let deadline = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);
        if (new Date() > deadline) {
            return "red";
        }
        else {
            return "green";
        }
    };

    const handleIsDone = async (x) => {
        setIsDone(x);
        await TaskController.changeIsDone(props.task.id, x);
    };

    const handleFullDate = () => {
        let res = "";
        if (deadlineDate === null) {
            return res;
        }
        res += deadlineDate;
        if (deadlineTime === null) {
            return res;
        }
        return res += " " + deadlineTime;
    };

    return isTaskUpdatingCtx && updatingTaskIDCtx === props.task.id
    ? updateForm
    : (
        <div className="task">
            <div className="task-data">
                <div className="checkbox-and-title">
                    <input type="checkbox" id="isDone" name="isDone" checked={isDone}
                        onChange={(x) => handleIsDone(x.target.checked)}
                    />
                    <label htmlFor="isDone" className="task-title">{title}</label>
                </div>
                <p className="task-small-description">{handleDescription(description)}</p>
                <div className="add-task-extra-params">
                    <p className="deadline" style={{
                        "color": handleDeadline()
                    }}>{props.fullDate
                        ? handleFullDate()
                        : deadlineTime?.substring(0, 5)}</p>
                    <p className="priority" style={{
                        "color": handlePriority(priority)
                    }}>Приоритет {priority}</p>
                </div>
            </div>
            <div className="task-buttons">
                <button className="task-button" onClick={() => {
                    setUpdatingTaskIDCtx(props.task.id);
                    setIsTaskCreatingCtx(false);
                    setIsTaskUpdatingCtx(true);
                }}>
                    <img className="button-image" src={editIcon} alt=""/>
                </button>
                <button className="task-button" onClick={() => handleDelete()}>
                    <img className="button-image" src={trashIcon} alt=""/>
                </button>
            </div>
        </div>
    );
};

export default Task;