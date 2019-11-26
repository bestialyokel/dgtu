SELECT ST.Semestr, ROUND(AVG(M.Mark), 2) FROM StudentsT AS ST
LEFT JOIN StudPlany AS PLAN on (ST.IDStudent = PLAN.Student)
LEFT JOIN Mark as M on (PLAN.IDStudPlan = M.TStudPlan)
GROUP BY ST.Semestr
HAVING COUNT(M.Mark) > 0;
