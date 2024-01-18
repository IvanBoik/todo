import axios from "axios";

export default class TaskController {
    static async todayTasks(userID) {
        try {
            return await axios.get(`http://localhost:8080/api/tasks/${userID}/today`);
        } catch (error) {
            console.error('Error find tasks: ', error);
        }
    }

    static async allTasks(userID) {
        try {
            return await axios.get(`http://localhost:8080/api/tasks/${userID}`);
        } catch (error) {
            console.error('Error find tasks: ', error);
        }
    }

    static async addTask(task) {
        try {
            return await axios.post('http://localhost:8080/api/tasks/add', task);
        } catch (error) {
            console.error('Error add task: ', error);
        }
    }

    static async deleteTask(id) {
        try {
            await axios.delete(`http://localhost:8080/api/tasks/delete/${id}`);
        } catch (error) {
            console.error('Error delete task: ', error);
        }
    }

    static async updateTask(task) {
        try {
            await axios.post('http://localhost:8080/api/tasks/update', task);
        } catch (error) {
            console.error('Error update task: ', error);
        }
    }

    static async logs(id) {
        try {
            return await axios.get(`http://localhost:8080/api/task_logs/all/${id}`);
        } catch (error) {
            console.error('Error find logs: ', error);
        }
    }

    static async changeIsDone(id, value) {
        try {
            await axios.put(`http://localhost:8080/api/tasks/change_is_done/${id}/${value}`);
        } catch (error) {
            console.error('Error find logs: ', error);
        }
    }
}