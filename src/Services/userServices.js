import API from "../utils/axiosConfig";
class UserServices{
    async getAllUsers(page){
        const data = await API.get(`/users?page=${page}`);
        return data;
    } 
    async getUserById(id){
        const url = `/users/${id}`;
        const {data} = await API.get(url);
        return data;
    }
}
export default new UserServices();