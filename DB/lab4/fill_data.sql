INSERT INTO Clients VALUES (DEFAULT, 'Ivanov', 'Ivan', 'Ivanovich', '+71234445566');
INSERT INTO Clients VALUES (DEFAULT, 'Sergeevich', 'Ivan', 'Sergeevich', '+71234445523');
INSERT INTO Clients VALUES (DEFAULT, 'Sergeevich', 'Ivan', 'Sergeevich', '+71234445553');


/* */

INSERT INTO Providers VALUES (DEFAULT, 'Rostelecom');

/* */

INSERT INTO Tariffs VALUES (DEFAULT, 'Базовый', 499.99, 2630000);

/* */

INSERT INTO Services VALUES (DEFAULT, 1, 1, 300, 'Internet', 'Dostup v internet');

INSERT INTO Services VALUES (DEFAULT, 1, 1, 200, 'Телефон', 'Звонить типа да');

/* */

INSERT INTO Contracts VALUES (DEFAULT, 1, 1, 'Ростов-на-Дону, ул. Гагарина 1', 'Ф', NOW()  );


INSERT INTO Contracts VALUES (DEFAULT, 2, 1, 'Ростов-на-Дону, ул. Гагарина 2', 'Ф', NOW()  );

INSERT INTO Contracts VALUES (DEFAULT, 3, 1, 'Ростов-на-Дону, ул. Гагарина 2', 'Ю', NOW()  );

/* */

INSERT INTO Appeals VALUES (DEFAULT, 1, 'открыт', NOW() , 'пропал интернет // дополнение до минимума символов');

INSERT INTO Appeals VALUES (DEFAULT, 1, 'открыт', NOW() , 'не работает телефон((  // дополнение до минимума символов');

INSERT INTO Appeals VALUES (DEFAULT, 2, 'закрыт', NOW() , 'пропал интернет помогите // дополнение до минимума символов');

/* */

INSERT INTO Workers VALUES (DEFAULT, 1, DEFAULT, 'Бачурин', 'Данила', 'Дмитриевич', 'пойдет, нормально');

/* */

INSERT INTO Jobs VALUES (DEFAULT, 2, NOW() , '3', 'Завершена'); 

INSERT INTO Jobs VALUES (DEFAULT, 3, NOW() , '3', 'Завершена'); 
