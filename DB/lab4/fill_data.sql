INSERT INTO Clients VALUES (NULL, 'Ivanov', 'Ivan', 'Ivanovich', '+71234445566');
INSERT INTO Clients VALUES (NULL, 'Sergeevich', 'Ivan', 'Sergeevich', '+71234445523');
INSERT INTO Clients VALUES (NULL, 'Sergeevich', 'Ivan', 'Sergeevich', '+71234445523');


/* */

INSERT INTO Providers VALUES (NULL, 'Rostelecom');

/* */

INSERT INTO Tariffs VALUES (NULL, 'Базовый', 499.99, 2630000);

/* */

INSERT INTO Services VALUES (NULL, 1, 1, 300, 'Internet', 'Dostup v internet');

INSERT INTO Servies VALUES (NULL, 1, 1, 200, 'Телефон', 'Звонить типа да');

/* */

INSERT INTO Contracts VALUES (NULL, 1, 1, 'Ростов-на-Дону, ул. Гагарина 1', 'Ф', strftime('%s','now') );


INSERT INTO Contracts VALUES (NULL, 2, 1, 'Ростов-на-Дону, ул. Гагарина 2', 'Ф', strftime('%s','now') );

INSERT INTO Contracts VALUES (NULL, 3, 1, 'Ростов-на-Дону, ул. Гагарина 2', 'Ю', strftime('%s','now') );

/* */

INSERT INTO Appeals VALUES (NULL, 1, 'открыт', strftime('%s','now'), 'пропал интернет // дополнение до минимума символов');

INSERT INTO Appeals VALUES (NULL, 1, 'открыт', strftime('%s','now'), 'не работает телефон((  // дополнение до минимума символов');

INSERT INTO Appeals VALUES (NULL, 2, 'закрыт', strftime('%s','now'), 'пропал интернет помогите // дополнение до минимума символов');

/* */

INSERT INTO Workers VALUES (NULL, 1, NULL, 'Бачурин', 'Данила', 'Дмитриевич', 'пойдет, нормально');

/* */

INSERT INTO Jobs VALUES (NULL, 2, strftime('%s','now'), '3', 'Завершена'); 

INSERT INTO Jobs VALUES (NULL, 3, strftime('%s','now'), '3', 'Завершена'); 
