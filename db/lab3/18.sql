/*Вывести сумму, которую потратил каждый владелец на автомобили. Нулевые цены не учитывать.*/
SELECT A.C_OWNER, SUM(A.COST), COUNT(A.COST) FROM AUTO AS A
WHERE A.COST AND A.COST > 0
GROUP BY A.C_OWNER;

/*Если предложение WHERE определяет предикат для фильтрации строк, то предложение HAVING применяется после группировки для определения аналогичного предиката*/