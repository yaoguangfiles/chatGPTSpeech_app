
import axios from "axios";
import ChatDataGram from '../models/chatDataGram';
import ChatResponse from '../models/chatResponse';

//'Authorization': 'Bearer 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', // free account API key
// 'Authorization': 'Bearer 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', // paid account API key
const http = axios.create({
    // baseURL: "https://localhost:7072",
    baseURL: "https://api.openai.com/v1/chat", //baseURL: "https://api.openai.com/v1/chat/completions",
    headers: {
        'Authorization': 'Bearer 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', // free account API key
        'Content-Type': 'application/json'
    }
});

// -------------- Y: begin -----------

const sendChatMsg = (chatDataGram: ChatDataGram) => {
    return http.post<ChatDataGram>("/completions", chatDataGram);
};

const APIChatService = {
    sendChatMsg
};

export default APIChatService;