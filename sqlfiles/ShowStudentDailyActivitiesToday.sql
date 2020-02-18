DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowStudentDailyActivities` (IN Id INT, IN thisday VARCHAR(255))

BEGIN
	SELECT * 
		FROM `DailyActivites`
			JOIN `Activities`
				ON `DailyActivites`.ActivityId=`Activities`.ActivityId
					WHERE `StudentId` = id AND `CurrentDate` = CURRENT_DATE
                    ORDER BY Activities.ActivityId ASC;
END $$