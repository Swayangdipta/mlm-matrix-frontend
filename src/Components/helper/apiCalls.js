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
    try {
        const res = await axios.get(`${backend}/get-user/${userId}`);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const getWholeDownlines = async (userId) => {    
    try {
        const res = await axios.get(`${backend}/downlines/${userId}`);
        
        return res;
    } catch (error) {
        return error.response;
    }
}


export const getDirectDownline = async (userId) => {    
    try {
        const res = await axios.get(`${backend}/downline/direct/${userId}`);
        
        return res;
    } catch (error) {        
        return error.response;
    }
}

export const getUserPaymentStatus = async (userId) => {    
    try {
        const res = await axios.get(`${backend}/payment-status/${userId}`);
        
        return res;
    } catch (error) {
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
        const res = await axios.put(`${backend}/update-profile/${userId}`,data);
        
        return res;
    } catch (error) {
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

export const payToIndividual = async (userId,data) => {    
    try {
        const res = await axios.post(`${backend}/pay/${userId}`,data);
        
        return res;
    } catch (error) {
        return error.response;
    }
}

export const getTwoLevelDownline = async (userId,data) => {    
    try {
        const res = await axios.get(`${backend}/two-level-downlines/${userId}`);
        
        return res;
    } catch (error) {
        return error.response;
    }
}

export const getUserCredits = async (userId) => {
    try {
        const res = await axios.get(`${backend}/user/credits/${userId}`);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const getUserWithdrawals = async (userId) => {
    try {
        const res = await axios.get(`${backend}/user/withdrawals/${userId}`);
        
        return res;
    } catch (error) {
        console.log(error);
        
        return error.response;
    }
}

export const updateActiveStatus = async (userId) => {
    try {
        const res = await axios.put(`${backend}/user/status/${userId}`);
        
        return res;
    } catch (error) {
        return error;
    }
}

export const removeUser = async (userId) => {
    try {
        const res = await axios.delete(`${backend}/user/delete/${userId}`);
        
        return res;
    } catch (error) {
        return error;
    }
}