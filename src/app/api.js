import axios from 'axios';

export const getQuestions = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/questions`);
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error getting questions:", error);
    }
};

export const getAnswers = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/answers`);
        return response.data;
    } catch (error) {
        console.error("Error getting answers:", error);
    }
};
