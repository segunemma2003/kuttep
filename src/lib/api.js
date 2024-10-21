import axios from 'axios';

const api = axios.create({
    baseURL: 'https://kutteai-903b0aa96180.herokuapp.com/api', // Replace with your Laravel API base URL
    // baseURL: 'http://localhost:8000/api', // Replace with your Laravel API base URL
    headers: {
        'Content-Type': 'application/json',
    }
});

// Helper function to check response status
const handleResponse = (response) => {
    if (response && response.status >= 200 && response.status < 300) {
        return response.data;
    }
    return null;
};

// Helper function to handle error
const handleError = (error) => {
    if (error.response && error.response.status >= 400) {
        return null; // Return null for non-200 responses
    }
    throw error.message || 'Something went wrong';
};

// Get first setting
export const getFirstSetting = async () => {
    try {
        const response = await api.get('/settings');
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// Store feedback
export const storeFeedback = async (feedbackData) => {
    try {
        const response = await api.post('/feedback', feedbackData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// Store recent buy
export const storeRecentBuy = async (recentBuyData) => {
    try {
        const response = await api.post('/recent-buys', recentBuyData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// Get recent buys (latest 20)
export const getRecentBuys = async () => {
    try {
        const response = await api.get('/recent-buys');
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// Store address
export const storeAddress = async (addressData) => {
    try {
        const response = await api.post('/addresses', addressData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// Store referral
export const storeReferral = async (referralData) => {
    try {
        const response = await api.post('/referrals', referralData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// Get referrals (latest 10)
export const getReferrals = async () => {
    try {
        const response = await api.get('/referrals');
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// Get referral code by address
export const getReferralCode = async (data) => {
    try {
        const response = await api.post('/get-referral-code', data);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};


// Get referral code by address
// e.g {
//     "referral_code":"QPGZFNDA",
//     "user_address": "0x54991a05e4bF171B8f2Fa24c08E7C2eae1207Bd9"
// }

export const getAddressReferralCode = async (data) => {
    try {
        const response = await api.post('/get-referral-code-by-address', data);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};



// Get referral code by address
//
export const getAllTasks = async () => {
    try {
        const response = await api.post('/tasks');
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};


// Get referral code by address
//
export const getAllReferrals = async () => {
    try {
        const response = await api.post('/addresses/referrals');
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};


//do the task
// {
//     "address_id":3,
//     "task_id": 1,
//     "amount":2000
// }
export const doTask = async (data) => {
    try {
        const response = await api.post('/tasks/complete',data);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};


// task summary
export const taskSummary = async () => {
    try {
        const response = await api.post('/tasks/summary');
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};



