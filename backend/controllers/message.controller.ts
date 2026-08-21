import { Message } from "../models/Message";
import type { Message as typeMessage } from "../types/types";

export const getMessages = async (roomId: number): Promise<number | typeMessage[]> => {
    try {
        const messages = await Message.findAll({where: {id: roomId}});
        if (messages) {
            if (messages.length < 10) {
                return messages;
            }else{
                return messages.slice(0,9);
            }
        }
        return 0;
    } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
        return [];
    }
}

export const createMessage = async (message: typeMessage) => {
    try {
        if (message.text.trim() === "" || message.roomId === null) {
            throw new Error;
        }else{
            const msg = await Message.create({username: message.username, text: message.text, roomId: message.roomId});
            console.log('test');
        }
    } catch (error) {
        console.error(error);
    }
}