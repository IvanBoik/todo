import React , {useState , useEffect , useContext} from 'react';
import plusIcon from '../../images/plus-svgrepo-com.svg';
import './style.css';
import PageSideBar from "../../components/page_side_bar/PageSideBar";
import Task from "../../components/task/Task";
import TaskController from "../../api/TaskController";
import {CreateAndUpdateContext} from "../../context";

const TodayTasksPage = () => {
    const {
        isTaskUpdatingCtx,
        setIsTaskUpdatingCtx,
        isTaskCreatingCtx,
        setIsTaskCreatingCtx
    } = useContext(CreateAndUpdateContext);
    let user = JSON.parse(localStorage.getItem("todoUser"));

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(null);
    const [deadline, setDeadline] = useState(null);
    const [priority, setPriority] = useState(4);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await TaskController.todayTasks(user.id);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks: ', error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async () => {
        let d = new Date();
        console.log(d);
        let newTask = {
            userID: user.id,
            title,
            description,
            priority,
            deadlineDate: d,
            deadlineTime: deadline
        }
        let response = await TaskController.addTask(newTask)
        setTasks([...tasks, response.data])
        setIsTaskCreatingCtx(false)
    };

    const addTaskButton = (
        <button className="add-task-button" onClick={() => {
            setIsTaskUpdatingCtx(false)
            setIsTaskCreatingCtx(true)
        }}>
            <img src={plusIcon} alt="" className="add-task-icon"/>
            <p className="add-task-text">Добавить задачу</p>
        </button>
    );

    const addTaskForm = (
        <div className="add-task-form">
            <input type="text" className="add-task-input-title" placeholder="Название задачи"
                    onChange={x => setTitle(x.target.value)}
            />
            <input type="text" className="add-task-input-description" placeholder="Описание"
                   onChange={x => setDescription(x.target.value)}
            />
            <div className="add-task-extra-params">
                <input type="time" className="add-task-input-date"
                       onChange={x => {
                           let parts = x.target.value.split(":")
                           let date = `${parts[0]}:${parts[1]}:00`
                           setDeadline(date)
                       }}/>
                <select className="add-task-input-priority" onChange={x => setPriority(x.target.value)}>
                    <option value="1">Приоритет 1</option>
                    <option value="2">Приоритет 2</option>
                    <option value="3">Приоритет 3</option>
                    <option value="4" selected>Приоритет 4</option>
                </select>
            </div>
            <div className="add-task-form-buttons">
                <button className="add-task-form-button"
                        onClick={() => setIsTaskCreatingCtx(false)}
                >Отмена</button>
                <button className="add-task-form-button"
                        disabled={title === ""}
                        onClick={() => addTask()}
                >Добавить задачу</button>
            </div>
        </div>
    );

    return (<div className="today-tasks-container">
        <PageSideBar/>
        <div className="container">
            <h2 className="title">Сегодня</h2>
            {tasks.map(x =>(
                <Task task={x} setTask={setTasks} fullDate={false}/>
            ))}
            {isTaskCreatingCtx
                ? addTaskForm
                : addTaskButton
            }
        </div>
    </div>);
};

export default TodayTasksPage;