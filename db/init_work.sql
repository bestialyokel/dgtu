/*
*
* BEGIN CLR
*
*/

DROP TABLE IF EXISTS Clients_tmp   CASCADE;
DROP TABLE IF EXISTS Contracts_tmp CASCADE;
DROP TABLE IF EXISTS Appeals_tmp   CASCADE;
DROP TABLE IF EXISTS Jobs_tmp      CASCADE;
DROP TABLE IF EXISTS Workers_tmp   CASCADE;
DROP TABLE IF EXISTS Services_tmp  CASCADE;
DROP TABLE IF EXISTS Tariffs_tmp   CASCADE;
DROP TABLE IF EXISTS TSPairs_tmp   CASCADE; 

DROP TABLE IF EXISTS Clients   CASCADE;
DROP TABLE IF EXISTS Contracts CASCADE;
DROP TABLE IF EXISTS Appeals   CASCADE;
DROP TABLE IF EXISTS Jobs      CASCADE;
DROP TABLE IF EXISTS Workers   CASCADE;
DROP TABLE IF EXISTS Services  CASCADE;
DROP TABLE IF EXISTS Tariffs   CASCADE;
DROP TABLE IF EXISTS TSPairs   CASCADE;
DROP TABLE IF EXISTS Users     CASCADE;
DROP TABLE IF EXISTS Logins    CASCADE;


/*
*
* END CLR
*
*/


/*
*
* BEGIN Tools & enum types
*
*/

DROP TYPE IF EXISTS Contract_Type;
CREATE TYPE Contract_Type AS ENUM ('ф', 'ю');

DROP TYPE IF EXISTS Processing_Status;
CREATE TYPE Processing_Status AS ENUM ('o', 'c', 'p'); /* open closed processing */

DROP TYPE IF EXISTS User_Role;
CREATE TYPE User_Role AS ENUM ('d', 't', 'a', 'x'); /* d - dev, t - tech, a - acc, x - admin */

create or replace function ternary(bool, anyelement, anyelement) 
returns anyelement language sql immutable as $$
select case when $1 then $2 else $3 end
$$;



/*
*
* END Tools
*
*/

/*
*
* IFDEF DATA 
* сегмент с объявлением сущностей, представляющих данные. 
* к каждой из них создаётся *_tmp 
* для дальнейшей реализации темпоральной модели 
* через навешивание триггерных ф-ий
* Избыточно *****
*
*/


/* Services */

CREATE TABLE IF NOT EXISTS Services (
    id_service SERIAL,
    name varchar(30),
    description varchar(50) DEFAULT '' NOT NULL
);

CREATE TABLE IF NOT EXISTS Services_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Services);

ALTER TABLE Services ADD PRIMARY KEY(id_service);


/* Tariffs */

CREATE TABLE IF NOT EXISTS Tariffs (
    id_tariff SERIAL,
    name varchar(30),
    payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0)
);

CREATE TABLE IF NOT EXISTS Tariffs_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Tariffs);

ALTER TABLE Tariffs ADD PRIMARY KEY(id_tariff);


/* TSPairs */

CREATE TABLE IF NOT EXISTS TSPairs (
    id_tariff SERIAL NOT NULL,
    id_service SERIAL NOT NULL
);

CREATE TABLE IF NOT EXISTS TSPairs_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (TSPairs);

ALTER TABLE TSPairs ADD FOREIGN KEY (id_tariff) REFERENCES Tariffs(id_tariff) ON DELETE CASCADE;
ALTER TABLE TSPairs ADD FOREIGN KEY (id_service) REFERENCES Services(id_service) ON DELETE CASCADE;
ALTER TABLE TSPairs ADD UNIQUE (id_tariff, id_service);


/* Clients */

CREATE TABLE IF NOT EXISTS Clients (
    id_client SERIAL,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    phone_number varchar(30)
);

CREATE TABLE IF NOT EXISTS Clients_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Clients);

ALTER TABLE Clients ADD PRIMARY KEY(id_client);


/* Contracts */

CREATE TABLE IF NOT EXISTS Contracts (
    id_contract SERIAL,
    id_client INTEGER NOT NULL,
    id_tariff INTEGER DEFAULT 0,
    address varchar(50),
    contract_type Contract_Type
);

CREATE TABLE IF NOT EXISTS Contracts_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Contracts);

ALTER TABLE Contracts ADD PRIMARY KEY(id_contract);
ALTER TABLE Contracts ADD FOREIGN KEY (id_client) REFERENCES Clients(id_client) ON DELETE CASCADE;
ALTER TABLE Contracts ADD FOREIGN KEY (id_tariff) REFERENCES Tariffs(id_tariff) ON DELETE SET NULL;


/* Appeals */

CREATE TABLE IF NOT EXISTS Appeals (
    id_appeal SERIAL,
    id_contract INTEGER NOT NULL,
    description text,
    status Processing_Status
);

CREATE TABLE IF NOT EXISTS Appeals_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Appeals);

ALTER TABLE Appeals ADD PRIMARY KEY(id_appeal);
ALTER TABLE Appeals ADD FOREIGN KEY (id_contract) REFERENCES Contracts(id_contract) ON DELETE CASCADE;


/* Jobs */

CREATE TABLE IF NOT EXISTS Jobs (
    id_job SERIAL,
    id_appeal INTEGER NOT NULL,
    description text,
    status Processing_Status
);

CREATE TABLE IF NOT EXISTS Jobs_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Appeals);

ALTER TABLE Jobs ADD PRIMARY KEY(id_job);
ALTER TABLE Jobs ADD FOREIGN KEY (id_appeal) REFERENCES Appeals(id_appeal) ON DELETE CASCADE;

/* Workers */

CREATE TABLE IF NOT EXISTS Workers (
    id_worker SERIAL,
    id_job INTEGER DEFAULT 0,
    name varchar(30),
    surname varchar(30),
    patronymic varchar(30),
    skills varchar(50)
);

CREATE TABLE IF NOT EXISTS Workers_tmp (
    create_date timestamp DEFAULT NOW(),
    actual boolean DEFAULT TRUE
) INHERITS (Appeals);

ALTER TABLE Workers ADD PRIMARY KEY(id_worker);
ALTER TABLE Workers ADD FOREIGN KEY (id_worker) REFERENCES Jobs(id_job) ON DELETE SET NULL;

/*
*
* ENDIF 
*
*/


/*
*
* Функциональные сущности
*
*/

CREATE TABLE IF NOT EXISTS Users (
    login varchar(20) PRIMARY KEY,
    password varchar(30),
    role User_Role
);

CREATE TABLE IF NOT EXISTS Logins (
    key varchar(32) PRIMARY KEY,
    login varchar(20) NOT NULL REFERENCES Users ON DELETE CASCADE
);

/*
    Можно добавить транзакции для User - X чтобы он обрабатывал запросы на откаты...
*/