CREATE TABLE IF NOT EXISTS Tariffs (
	idTariff SERIAL PRIMARY KEY NOT NULL,
	name TEXT NOT NULL,
	payment REAL CHECK(payment >= 0),
	period INTEGER CHECK (period >= 0)
);
