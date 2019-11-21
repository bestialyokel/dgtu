/*SELECT T.name, CL.* FROM Tariffs AS T
LEFT JOIN Contracts AS Con on (Con.idTariff = T.idTariff)
INNER JOIN Clients as CL on (CL.idClient = Con.idClient);*/



/*SELECT T.name, CL.* FROM Tariffs AS T
WHERE T.idTariff = (SELECT Con.idTariff FROM Contracts AS Con
			WHERE (T.idTariff = Con.idTariff*/





/*SELECT * FROM Contracts
GROUP BY (SELECT name FROM Tariffs);*/

SELECT T.*, CL.* FROM Clients CL, Tariffs T, Contracts Con
WHERE Con.idCLient=CL.idClient AND T.idTariff = Con.idTariff;
