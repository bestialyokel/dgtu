
INSERT INTO Services VALUES (DEFAULT, 'service1', 'test'), (DEFAULT, 'service2', 'test');
INSERT INTO Tariffs VALUES (DEFAULT, 'tariff1', 100, 200);
INSERT INTO TSPairs VALUES (1, 1), (1, 2);
INSERT INTO Clients VALUES (DEFAULT, 'ivan', 'ivanov', 'ivanov', '89613308969'), (DEFAULT, 'chel', '123', 'nan', '02');
INSERT INTO Contracts VALUES (DEFAULT, 1, 1, 'pl. gagarina 1', 'ф'), (DEFAULT, 2, 1, 'pl. gagarina 2', 'ф'), (DEFAULT, 2, 1, 'pl. gagarina 2', 'ф');
INSERT INTO Appeals VALUES (DEFAULT, 1, 'net ineta', 'o'), (DEFAULT, 1, 'net ineta', 'o'), (DEFAULT, 1, 'net ineta2', 'o'), (DEFAULT, 1, 'net ineta2', 'o');
INSERT INTO Jobs VALUES (DEFAULT, 1, 'rabota kipit', 'o');
INSERT INTO Workers VALUES (DEFAULT, 1, 'rabochii1', 'rabochii', 'rabotnik', 'montajnik');

UPDATE Contracts SET address = 'ivan' WHERE id_contract = 1;
UPDATE Contracts SET address = 'ivan' WHERE id_contract = 1;
UPDATE Contracts SET address = 'ivan' WHERE id_contract = 1;
UPDATE Contracts SET address = 'ivan' WHERE id_contract = 1;
UPDATE Contracts SET address = 'ivan' WHERE id_contract = 1;
UPDATE Contracts SET address = 'ivan' WHERE id_contract = 1;
UPDATE Contracts SET address = 'ivan' WHERE id_contract = 1;
UPDATE Contracts SET address = 'ivan' WHERE id_contract = 1;
UPDATE Contracts SET address = 'ivan' WHERE id_contract = 1;
UPDATE Contracts SET address = 'ivan' WHERE id_contract = 1;

UPDATE Contracts SET address = 'address00' WHERE id_contract = 1;
UPDATE Contracts SET address = 'address00' WHERE id_contract = 1;
UPDATE Contracts SET address = 'address00' WHERE id_contract = 1;
UPDATE Contracts SET address = 'address00' WHERE id_contract = 1;
UPDATE Contracts SET address = 'address00' WHERE id_contract = 1;
UPDATE Contracts SET address = 'address00' WHERE id_contract = 1;


