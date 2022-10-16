import axios from "axios";

const debtApi = (token: string) => axios.create({
    baseURL: 'https://debt-buddy-server-production.up.railway.app/',
    //baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default debtApi;