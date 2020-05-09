
export class Conversation {
    name: string;
    id: number;
}

export class Message {
    id: number;
    idSender: number;
    idConversation: number;
    text: string
}

export class User {
    id: number;
    login: string;
    password: string;
}

export class UserConversationPair {
    idUser: number;
    idConversation: number
}

export class UserToken {
    id: number;
    key: string;
    idUser: number;
}