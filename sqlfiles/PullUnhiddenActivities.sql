DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullUnhiddenActivities` (OUT ActivityName   VARCHAR(255))  
BEGIN
SELECT ActivityName INTO @AvtivityName 
FROM Activities
	WHERE Hidden = 0;
END $$