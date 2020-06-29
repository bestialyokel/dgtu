import { Conversation, UserConversationPair, User, Message } from "../types?";


export default interface IConversationService {
    createOne(data: object) : Promise<Conversation>;
    deleteOne(id: number) : Promise<Conversation>;
    updateOne(id: number, data: object) : Promise<Conversation>;
    getOne(id: number) : Promise<Conversation>;

    addUser(idConversation: number, user: object) : Promise<UserConversationPair>;
    removeUser(idConversation: number, user: object) : Promise<UserConversationPair>;

    addMessage(idConversation: number, message: object) : Promise<Message>;
    deleteMessage(idConversation: number, message: object) : Promise<Message>;
    updateMessage(idConversation: number, message: object) : Promise<Message>;
    getMessages(idConversation: number) : Promise<Message[]>;

    getConversationUsers(idConversation: number) : Promise<UserConversationPair[]>;
    getUserConversations(idUser: number) : Promise<UserConversationPair[]>;
}   