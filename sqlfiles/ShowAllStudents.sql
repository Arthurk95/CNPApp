DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowAllStudents` ()

BEGIN
	Select * FROM 'Students', 'Schedule', 'Relatives'
	ORDER BY StudentName ASC;
END $$