import ChatResponse from "./chatResponse";

interface ChatDataGram {
    //data: ChatResponse;
    model: string;
    messages: Array<{ role: string, content: string}>;

    // Messages: Array<{ Role: string, Content: string}> = [
    //     { id: 1, msg: 'message'},
    //     { id: 2, msg: 'message2'}
    //   ]
    // Messages: [{Role: string, Content: string}]
}

export default ChatDataGram;
