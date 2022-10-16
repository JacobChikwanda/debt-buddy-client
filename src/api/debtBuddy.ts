import axios from "axios";

const debtApi = (token: string) => axios.create({
    baseURL: 'https://debt-buddy-server-production.up.railway.app/',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default debtApi;