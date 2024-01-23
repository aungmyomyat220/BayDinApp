import axios from 'axios';

export const getQuestions = async () => {
    try {
        const response = await axios.get(`/questions`);
        return response.data;
    } catch (error) {
        console.error("Error getting questions:", error);
    }
};

export const getAnswers = async () => {
    try {
        const response = await axios.get(`/answers`);
        return response.data;
    } catch (error) {
        console.error("Error getting answers:", error);
    }
};
