DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowStudentAttendedDates` (IN Id INT)
BEGIN
SELECT Activities.ActivityName
		FROM `Activities`
			JOIN `DailyActivites`
				ON Activities.ActivityId = DailyActivites.ActivityId
        WHERE DailyActivites.StudentId = Id AND CurrentDate=thisday;
		
END$$