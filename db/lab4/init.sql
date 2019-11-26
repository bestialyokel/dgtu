CREATE TABLE IF NOT EXISTS Providers (
	idProvider SERIAL PRIMARY KEY NOT NULL,
	name TEXT NOT NULL
	
);

CREATE TABLE IF NOT EXISTS Tariffs (
	idTariff SERIAL PRIMARY KEY NOT NULL,
	idProvider INTEGER NOT NULL,
	name TEXT NOT NULL,
	payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0),
	FOREIGN KEY(idProvider) REFERENCES Providers(idProvider)
);

CREATE TABLE IF NOT EXISTS Tariffs_Dependencies (
	idTariff INTEGER NOT NULL,
	idService INTEGER NOT NULL,
	FOREIGN KEY(idTariff) REFERENCES Tariffs(idTariff),
	FOREIGN KEY(idService) REFERENCES Services(idService)
);

CREATE TABLE IF NOT EXISTS Services (
	idService SERIAL PRIMARY KEY NOT NULL,
	idProvider INTEGER NOT NULL,
	name TEXT NOT NULL,
	FOREIGN KEY(idProvider) REFERENCES Providers(idProvider)
);

CREATE TABLE IF NOT EXISTS Clients (
	idClient SERIAL PRIMARY KEY NOT NULL,
	surname TEXT NOT NULL,
	name TEXT NOT NULL,
	patronymic TEXT NOT NULL,
	phoneNumber TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Contracts (
	idContract SERIAL PRIMARY KEY NOT NULL,
	idClient INTEGER NOT NULL,
	idTariff INTEGER, 
	address TEXT NOT NULL,
	type TEXT NOT NULL,
	conclusionDate DATE NOT NULL, /*seconds since 1970 ... */
	FOREIGN KEY(idClient) REFERENCES Clients(idClient),
	FOREIGN KEY(idTariff) REFERENCES Tariffs(idTariff)
);
INSERT INTO Clients VALUES (DEFAULT, 'Tezt', 'Abcd', 'val', '89003005050');


CREATE TABLE IF NOT EXISTS Appeals (
	idAppeal SERIAL PRIMARY KEY NOT NULL,
	idContract INTEGER NOT NULL,
	status TEXT NOT NULL,
	appealDate DATE NOT NULL,
	description TEXT CHECK (LENGTH(description) > 20),
	FOREIGN KEY(idContract) REFERENCES Contracts(idContract)
);

CREATE TABLE IF NOT EXISTS Jobs (
	idJob SERIAL PRIMARY KEY NOT NULL,
	idAppeal INTEGER NOT NULL,
	startTime DATE NOT NULL,
	complexity TEXT NOT NULL,
	STATUS TEXT NOT NULL,
	FOREIGN KEY(idAppeal) REFERENCES Appeals(idAppeal)
);

CREATE TABLE IF NOT EXISTS Workers (
	idWorker SERIAL PRIMARY KEY NOT NULL,
	idProvider INTEGER NOT NULL,
	idJob INTEGER,
	surname TEXT NOT NULL,
	name TEXT NOT NULL,
	patronymic TEXT NOT NULL,
	qualification TEXT CHECK (LENGTH(qualification) > 15),
	FOREIGN KEY(idProvider) REFERENCES Providers(idProvider),
	FOREIGN KEY(idJob) REFERENCES Jobs(idJob)
);
