DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullUnhiddenActivities` ()  
BEGIN
SELECT ActivityId, ActivityName
FROM Activities
	WHERE Hidden = 0
	ORDER BY ActivityName ASC;
END $$