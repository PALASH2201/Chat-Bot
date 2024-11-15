import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const generateResponse = async (message) => {
    try {
        const response = await axiosInstance.post("/chat/ai/generateStream", {message});
        return response.data;
    } catch (error) {
        console.error("Error generating response:", error);
        throw error;
    }
}
