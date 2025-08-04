import axios from "axios";

const token = ""

const axiosInstance = axios.create({
    baseURL:"http://localhost:8000/api/v1",
    withCredentials:true,
    headers:{
        Authorization: `bearer ${token}`
    }
})

export default axiosInstance