DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowAllStudents` ()

BEGIN
	Select * FROM Students;
END $$