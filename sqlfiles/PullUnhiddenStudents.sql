DELIMITER $$

CREATE PROCEDURE `PullUnhiddenStudents`()
BEGIN

SET @DayDate = CURRENT_DATE;
	SELECT Students.StudentId, Students.StudentName
		FROM `Students`
			JOIN `ClassSession`
				ON Students.StudentId=ClassSession.StudentId
					WHERE `CurrentDate` = @DayDate AND `Absent` = 0;
END $$