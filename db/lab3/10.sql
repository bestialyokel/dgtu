/*Напишите запрос, который выводит название марки, средняя цена автомобиля для которой наибольшая. Нулевые не учитывать. */
SELECT Z.NAME_REC FROM MENU AS Z 
	WHERE Z.C_MENU || Z.C_REC = (SELECT A.C_PLANT FROM AUTO AS A
					WHERE A.COST>0
					GROUP BY A.C_PLANT
					ORDER BY AVG(A.COST) DESC LIMIT 1);

/*|| concat strings*/
