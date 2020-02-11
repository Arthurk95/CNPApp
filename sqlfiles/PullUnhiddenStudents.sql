DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullUnhiddenStudents` (IN DayOfWeek VARCHAR(255))  
BEGIN

SET @DayName = DAYNAME(CURRENT_DATE);
SET @sqlstm = CONCAT("SELECT Students.StudentId, Students.StudentName
					  FROM Students
					  INNER JOIN Schedual
					  ON Students.StudentId=Schedual.StudentId
					  WHERE `", @DayName, "` = 1;");
PREPARE stmt FROM @sqlstm;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

END $$