CREATE TABLE IF NOT EXISTS Services (
	idService SERIAL PRIMARY KEY NOT NULL,
	idProvider INTEGER NOT NULL,
	idTariff INTEGER, 
	payment REAL CHECK(payment >= 0),
	name TEXT NOT NULL,
	description TEXT,
	FOREIGN KEY(idProvider) REFERENCES Providers(idProvider),
	FOREIGN KEY(idTariff) REFERENCES Tariffs(idTariff)
);
