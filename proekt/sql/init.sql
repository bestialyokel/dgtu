DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Message CASCADE;
DROP TABLE IF EXISTS Conversation CASCADE;
DROP TABLE IF EXISTS User_Token CASCADE;
DROP TABLE IF EXISTS User_Conversation_Pair CASCADE;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    login varchar(20),
    password varchar(30),
    UNIQUE(login)
);

CREATE TABLE Conversation (
    id SERIAL PRIMARY KEY
    name varchar(20),
);

CREATE TABLE User_Token (
    key varchar(24) PRIMARY KEY,
    id_user INTEGER REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE User_Conversation_Pair (
    id_user INTEGER REFERENCES Users(id),
    id_conversation INTEGER REFERENCES Conversation (id)
);

CREATE TABLE Message (
    id SERIAL PRIMARY KEY,
    id_sender INTEGER REFERENCES Users(id),
    id_conversation INTEGER REFERENCES Conversation (id),
    text text
);