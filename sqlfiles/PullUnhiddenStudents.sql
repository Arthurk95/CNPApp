DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullUnhiddenStudents` (IN DayOfWeek VARCHAR(255))  
BEGIN

SET @sqlstm = CONCAT("SELECT StudentId FROM Schedual WHERE `", DayOfWeek, "` = 1;");

PREPARE stmt FROM @sqlstm;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
END $$