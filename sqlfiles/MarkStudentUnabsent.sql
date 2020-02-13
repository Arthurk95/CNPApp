DELIMITER $$
CREATE PROCEDURE `cnp_data`.`MarkStudentUnabsent` (IN StudId INT)

BEGIN
	UPDATE ClassSession
    SET `Absent` = 0
	WHERE StudentId= StudId AND CurrentDate=CURRENT_DATE;
END $$