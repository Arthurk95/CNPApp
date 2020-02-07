DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullUnhiddenStudents` ()  
BEGIN
SELECT StudentName
FROM Students
	WHERE AbsentToday = 0;
END $$