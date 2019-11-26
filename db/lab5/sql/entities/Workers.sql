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
