import axios from 'axios';
const API_BASE_URL = "http://localhost:5000";

export const getQuestions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/questions`);
        return response.data;
    } catch (error) {
        console.error("Error getting questions:", error);
    }
};

export const getAnswers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/answers`);
        return response.data;
    } catch (error) {
        console.error("Error getting answers:", error);
    }
};
