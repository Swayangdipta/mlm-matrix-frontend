import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND;

export const register = async (user) => {
    try {
        const res = await axios.post(`${backend}/register`, user);
        console.log(res);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const login = async (user) => {
    try {
        const res = await axios.post(`${backend}/login`, user);
        console.log(res);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const getUplineTree = async (sponsor) => {
    try {
        const res = await axios.get(`${backend}/uplines/${sponsor}`);
        console.log(sponsor);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const getUsers = async () => {
    try {
        const res = await axios.get(`${backend}/users`);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const getDeposits = async () => {
    try {
        const res = await axios.get(`${backend}/deposits`);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const postDeposit = async (data) => {
    try {
        const res = await axios.post(`${backend}/deposit`, data);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const approveDeposit = async (data) => {
    try {
        const res = await axios.put(`${backend}/deposits/${data}`);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}