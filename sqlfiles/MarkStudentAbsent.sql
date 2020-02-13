DELIMITER $$
CREATE PROCEDURE `cnp_data`.`MarkStudentAbsent` (IN StudId INT)

BEGIN
	UPDATE ClassSession
    SET `Absent` = 1
	WHERE StudentId= StudId AND CurrentDate=CURRENT_DATE;
END $$