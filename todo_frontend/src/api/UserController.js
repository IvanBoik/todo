import axios from "axios";

export default class UserController {
    static async login(email, password) {
        try {
            return await axios.post("http://localhost:8080/api/users/sign_in", {email, password});
        } catch (error) {
            console.error('Error login: ', error);
        }
    }

    static async registration(name, email, password) {
        try {
            return await axios.post("http://localhost:8080/api/users/sign_up", {name, email, password});
        } catch (error) {
            console.error('Error registration: ', error);
        }
    }

    static async updateNameAndEmail(id, name, email) {
        return await axios.post("http://localhost:8080/api/users/update_name_and_email",
            {id, name, email});
    }

    static async updatePassword(id, oldPassword, newPassword) {
        return await axios.post("http://localhost:8080/api/users/update_password",
            {id, oldPassword, newPassword});
    }
}