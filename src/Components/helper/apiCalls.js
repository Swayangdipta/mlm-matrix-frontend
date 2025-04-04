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

export const getDownlineTree = async (user) => {
    try {
        const res = await axios.get(`${backend}/tree/${user}`);
        
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

export const getCompanyEarnings = async () => {
    try {
        const res = await axios.get(`${backend}/company-earnings`);
        
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

export const getFreeSlots = async (data) => {
    try {
        const res = await axios.get(`${backend}/free-slots/${data}`);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const payToComapny = async (data) => {
    try {
        const res = await axios.post(`${backend}/pay-comapny/${data}`);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const generateSIForm = async (data) => {
    try {
        const res = await axios.get(`${backend}/gen-pdf/${data}`,{
            responseType: 'blob' // Important: Set the response type to 'blob'
        });
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const searchDownline = async (userId, query) => {
    console.log(userId);
    
    try {
        const res = await axios.post(`${backend}/search`,{
            userId,
            query
        });
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const getUser = async (userId) => {
    console.log(userId);
    
    try {
        const res = await axios.get(`${backend}/get-user/${userId}`);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const getDownlineCount = async (userId) => {    
    try {
        const res = await axios.post(`${backend}/downline-count`,{
            userId
        });
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const updateUserProfile = async (userId, data) => {    
    try {
        console.log(userId);
        
        const res = await axios.put(`${backend}/update-profile/${userId}`,data);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const updateUserPassword = async (userId, data) => {    
    try {        
        const res = await axios.put(`${backend}/change-password/${userId}`,data);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}