import axios from "axios";

const debtApi = (token: string) => axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default debtApi;