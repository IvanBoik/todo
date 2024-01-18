import React , {useEffect , useState} from 'react';
import PageSideBar from "../../components/page_side_bar/PageSideBar";
import TaskController from "../../api/TaskController";
import "./style.css";

const LogsPage = () => {
    let user = JSON.parse(localStorage.getItem("todoUser"));

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await TaskController.logs(user.id);
                setLogs(response.data);
            } catch (error) {
                console.error('Error fetching logs: ', error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="logs-page-container">
            <PageSideBar/>
            <div className="logs-page-without-side-bar">
                {logs.map(logList => (
                    <div className="logs-in-day">
                        <h3 className="logs-day">{logList.day}</h3>
                        {logList.taskLogs.map(log => (
                            <div className="log">
                                <p className="log-description">{log.description}</p>
                                <p className="log-time">{log.actionTime.split(".")[0]}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogsPage;