CREATE TABLE IF NOT EXISTS Services (
    id_service SERIAL PRIMARY KEY,
    name varchar(30),
    description varchar(50) DEFAULT '' NOT NULL
);

CREATE TABLE IF NOT EXISTS Tariffs (
    id_tariff SERIAL PRIMARY KEY,
    name varchar(30),
    payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0)
);

CREATE TABLE IF NOT EXISTS TSPairs (
    id_tariff INTEGER NOT NULL REFERENCES Tariffs ON DELETE CASCADE,
    id_service INTEGER NOT NULL REFERENCES Services ON DELETE CASCADE,
    UNIQUE(id_tariff, id_service)
);

CREATE TABLE IF NOT EXISTS Clients (
    id_client SERIAL PRIMARY KEY,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30)
);

CREATE TABLE IF NOT EXISTS Contracts (
    id_contract SERIAL PRIMARY KEY,
    id_client INTEGER NOT NULL REFERENCES Clients ON DELETE CASCADE,
    id_tariff INTEGER REFERENCES Tariffs ON DELETE SET NULL,
    address varchar(50),
    contract_type Contract_Type
);

CREATE TABLE IF NOT EXISTS Appeals (
    id_appeal SERIAL PRIMARY KEY,
    id_contract INTEGER NOT NULL REFERENCES Contracts ON DELETE CASCADE,
    description text,
    status Processing_Status
);

CREATE TABLE IF NOT EXISTS Jobs (
    id_job SERIAL PRIMARY KEY,
    id_appeal INTEGER REFERENCES Appeals ON DELETE SET NULL,
    description text,
    status Processing_Status
);

CREATE TABLE IF NOT EXISTS Workers (
    id_worker SERIAL PRIMARY KEY,
    id_job INTEGER REFERENCES Jobs ON DELETE SET NULL,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    skills varchar(50)
);

CREATE TABLE IF NOT EXISTS Users (
    login varchar(20) PRIMARY KEY,
    password varchar(30),
    role User_Role
);

CREATE TABLE IF NOT EXISTS Logins (
    key varchar(32) PRIMARY KEY,
    login varchar(20) NOT NULL REFERENCES Users ON DELETE CASCADE
)