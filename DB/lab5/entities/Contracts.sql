CREATE TABLE IF NOT EXISTS Contracts (
	idContract SERIAL PRIMARY KEY NOT NULL,
	idClient INTEGER NOT NULL,
	idTariff INTEGER, 
	address TEXT NOT NULL,
	type TEXT NOT NULL,
	conclusionDate INTEGER NOT NULL, /*seconds since 1970 ... */
	FOREIGN KEY(idClient) REFERENCES Clients(idClient),
	FOREIGN KEY(idTariff) REFERENCES Tariffs(idTariff)
);
