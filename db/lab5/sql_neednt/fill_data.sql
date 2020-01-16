INSERT INTO Clients VALUES (DEFAULT, 'Ivanov', 'Ivan', 'Ivanovich', '+71234445566');
INSERT INTO Clients VALUES (DEFAULT, 'Sergeevich', 'Ivan', 'Sergeevich', '+71234445523');
INSERT INTO Clients VALUES (DEFAULT, 'Sergeevich', 'Ivan', 'Sergeevich', '+71234445523');


/* */

INSERT INTO Providers VALUES (DEFAULT, 'Rostelecom');

/* */

INSERT INTO Tariffs VALUES (DEFAULT, 'Базовый', 499.99, 2630000);

/* */

INSERT INTO Services VALUES (DEFAULT, 1, 1, 300, 'Internet', 'Dostup v internet');

INSERT INTO Servies VALUES (DEFAULT, 1, 1, 200, 'Телефон', 'Звонить типа да');

/* */

INSERT INTO Contracts VALUES (DEFAULT, 1, 1, 'Ростов-на-Дону, ул. Гагарина 1', 'Ф', strftime('%s','now') );


INSERT INTO Contracts VALUES (DEFAULT, 2, 1, 'Ростов-на-Дону, ул. Гагарина 2', 'Ф', strftime('%s','now') );

INSERT INTO Contracts VALUES (DEFAULT, 3, 1, 'Ростов-на-Дону, ул. Гагарина 2', 'Ю', strftime('%s','now') );

/* */

INSERT INTO Appeals VALUES (DEFAULT, 1, 'открыт', strftime('%s','now'), 'пропал интернет // дополнение до минимума символов');

INSERT INTO Appeals VALUES (DEFAULT, 1, 'открыт', strftime('%s','now'), 'не работает телефон((  // дополнение до минимума символов');

INSERT INTO Appeals VALUES (DEFAULT, 2, 'закрыт', strftime('%s','now'), 'пропал интернет помогите // дополнение до минимума символов');

/* */

INSERT INTO Workers VALUES (DEFAULT, 1, NULL, 'Бачурин', 'Данила', 'Дмитриевич', 'пойдет, нормально');

/* */

INSERT INTO Jobs VALUES (DEFAULT, 2, strftime('%s','now'), '3', 'Завершена'); 

INSERT INTO Jobs VALUES (DEFAULT, 3, strftime('%s','now'), '3', 'Завершена'); 
