DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullStudentData` (IN StudId INT)

BEGIN
	SELECT * 
		FROM `Students`, `Schedual`, `Relatives`
			WHERE `Schedual`.StudentId = StudId AND `Relatives`.StudentId = StudId AND `Students`.StudentId = StudId;
END $$
