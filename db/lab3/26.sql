WITH STUDENT_MARKS AS (
    SELECT Stud.IDStudent as id, Mark.Mark as mark, COUNT(*) as amount
    FROM StudentsT as Stud, StudPlany as Plan, Mark
    WHERE Stud.IDStudent = Plan.Student AND Plan.IDStudPlan = Mark.TStudPlan
    GROUP BY Stud.IDStudent, Mark.Mark
)
--SELECT * FROM STUDENT_MARKS;

SELECT id, 

        (SELECT 100.0 * amount FROM STUDENT_MARKS as sub 
        WHERE sub.id = up.id AND sub.mark IS NULL
        ) / sum(up.amount) as null_percent

FROM STUDENT_MARKS as up
GROUP BY id;