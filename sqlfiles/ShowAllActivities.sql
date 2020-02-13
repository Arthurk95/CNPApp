DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowAllActivities` ()

BEGIN
	Select * FROM Activities
	ORDER BY ActivityName;
END $$