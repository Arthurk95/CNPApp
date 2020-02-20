DELIMITER $$

CREATE PROCEDURE `PullUnhiddenStudents`()
BEGIN
	SET @DayDate = CURRENT_DATE;
			SELECT `Students`.StudentId, `Students`.StudentName
				FROM `Students`
					JOIN `ClassSession`
						ON Students.StudentId=ClassSession.StudentId
					JOIN `Schedual`
						ON `Students`.StudentId=`Schedual`.StudentId
							WHERE `CurrentDate` = @DayDate AND `Absent` = 0 AND ((`Schedual`.DayType=0 AND CURRENT_TIME < 120000) OR `Schedual`.Daytype=1)
						ORDER BY `Students`.StudentName ASC;
END $$