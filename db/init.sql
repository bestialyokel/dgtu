DROP TABLE IF EXISTS Clients CASCADE;
DROP TABLE IF EXISTS Contracts CASCADE;
DROP TABLE IF EXISTS Appeals CASCADE;
DROP TABLE IF EXISTS Jobs CASCADE;
DROP TABLE IF EXISTS Services CASCADE;
DROP TABLE IF EXISTS Tariffs CASCADE;
DROP TABLE IF EXISTS TSPairs CASCADE;
DROP TABLE IF EXISTS Workers CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Logins CASCADE;


/*
*
*
*
*  init table?
*
*
*
*
*
*
*
*/

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
    id_tariff INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    UNIQUE(id_tariff, id_service),
    FOREIGN KEY(id_tariff) REFERENCES Tariffs(id_tariff) ON DELETE CASCADE,
    FOREIGN KEY(id_service) REFERENCES Services(id_service) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Clients (
    id_client SERIAL PRIMARY KEY,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30)
);

DROP TYPE IF EXISTS Contract_Type;
CREATE TYPE Contract_Type AS ENUM ('ф', 'ю');

CREATE TABLE IF NOT EXISTS Contracts (
    id_contract SERIAL PRIMARY KEY,
    id_client INTEGER NOT NULL,
    id_tariff INTEGER DEFAULT 0,
    address varchar(50),
    contract_type Contract_Type,
    FOREIGN KEY(id_client) REFERENCES Clients(id_client) ON DELETE CASCADE,
    FOREIGN KEY(id_tariff) REFERENCES Tariffs(id_tariff) ON DELETE SET DEFAULT
);

DROP TYPE IF EXISTS Processing_Status;
CREATE TYPE Processing_Status AS ENUM ('open', 'closed', 'proc');

CREATE TABLE IF NOT EXISTS Appeals (
    id_appeal SERIAL PRIMARY KEY,
    id_contract INTEGER NOT NULL,
    description text,
    status Processing_Status DEFAULT 'open',
    FOREIGN KEY(id_contract) REFERENCES Contracts(id_contract) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Jobs (
    id_job SERIAL PRIMARY KEY,
    id_appeal INTEGER NOT NULL,
    description text,
    status Processing_Status DEFAULT 'open',
    FOREIGN KEY(id_appeal) REFERENCES Appeals(id_appeal) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Workers (
    id_worker SERIAL PRIMARY KEY,
    id_job INTEGER DEFAULT 0,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    skills varchar(50),
    FOREIGN KEY(id_job) REFERENCES Jobs(id_job) ON DELETE CASCADE
);

DROP TYPE IF EXISTS User_Role;
CREATE TYPE User_Role AS ENUM ('D', 'T', 'A', 'X');

CREATE TABLE IF NOT EXISTS Users (
    login varchar(20) PRIMARY KEY,
    password varchar(30),
    role User_Role
);

CREATE TABLE IF NOT EXISTS Logins (
    key varchar(32) PRIMARY KEY,
    login varchar(20) NOT NULL,
    FOREIGN KEY (login) REFERENCES Users(login) ON DELETE CASCADE
)

/*
*
*
*
*  fill some data next?
*
*
*
*
*
*
*
*/