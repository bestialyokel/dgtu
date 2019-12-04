/*WITH tariff AS (UPDATE Tariffs SET name='dsad' WHERE idtariff=5 RETURNING idtariff),
tariff1 AS(DELETE FROM Tariffs_dependencies WHERE idtariff=(SELECT idtariff FROM tariff limit 1) RETURNING idtariff)
INSERT INTO Tariffs_dependencies VALUES ((SELECT idtariff FROM tariff1 limit 1), 1);*/

CREATE TABLE Tariffsdeps (
    idtariff INTEGER NOT NULL,
    idservice INTEGER NOT NULL,
    FOREIGN KEY(idtariff) REFERENCES Tariffs(idtarifff),
    FOREIGN KEY(idservice) REFERENCES Services(idservice),
    UNIQUE(idtariff, idservice)
);

WITH tariff AS (UPDATE Tariffs SET name='dsa', payment=122, period=1 WHERE idtariff=1 RETURNING idtariff),
        (INSERT INTO Tariffsdeps VALUES 
            ((SELECT idtariff FROM tariff LIMIT 1), 1),
            ((SELECT idtariff FROM tariff LIMIT 1), 2)
        )
    DELETE FROM Tariffsdeps WHERE idtariff=1 RETURNING idtariff       
