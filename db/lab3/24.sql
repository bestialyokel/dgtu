

SELECT Addr.AddrCountry,COUNT(Addr.IDAddress) FROM Addresses AS Addr
INNER JOIN Persons AS PS on (PS.IDPersons=Addr.IDВладельца)
INNER JOIN PersonT AS PT on (PS.IDPersons=PT.IngPerson)
INNER JOIN StudentsT as ST on (PT.IngPerson=ST.IDPerson)
WHERE (PS.Пол='м' AND (ST.Semestr='7' OR ST.Semestr='8') ) OR (PS.Пол='ж' AND ST.Semestr='9')
GROUP BY Addr.AddrCountry;


/*
*/
