DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullUnhiddenActivities` (OUT ActivityName   VARCHAR(255))  
BEGIN
SELECT ActivityName
FROM Activities
	WHERE Hidden = 0;
END $$