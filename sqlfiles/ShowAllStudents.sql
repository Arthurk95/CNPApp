DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowAllStudents` ()

BEGIN
	SELECT *
		FROM `Students`
			JOIN `Schedual`
				ON `Students`.StudentId=`Schedual`.StudentId
			JOIN `Relatives`
				ON `Students`.StudentId=`Relatives`.StudentId
					ORDER BY Students.StudentName ASC;
END $$