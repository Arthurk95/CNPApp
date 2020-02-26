DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowStudentDailyActivitiesToday` (IN Id INT)

BEGIN
	SELECT * 
		FROM `DailyActivites`
			JOIN `Activities`
				ON `DailyActivites`.ActivityId=`Activities`.ActivityId
					WHERE `StudentId` = id AND `CurrentDate` = CURRENT_DATE
                    ORDER BY Activities.ActivityId ASC;
END $$