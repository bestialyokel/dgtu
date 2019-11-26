CREATE TABLE IF NOT EXISTS Appeals (
	idAppeal SERIAL PRIMARY KEY NOT NULL,
	idContract INTEGER NOT NULL,
	status TEXT NOT NULL,
	appealDate INTEGER NOT NULL,
	description TEXT CHECK (LENGTH(description) > 20),
	FOREIGN KEY(idContract) REFERENCES Contracts(idContract)
);
