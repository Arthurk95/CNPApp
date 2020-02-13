DELIMITER $$
CREATE PROCEDURE `cnp_data`.`DeleteActivity` (IN ActId INT)

BEGIN
	DELETE FROM `DailyActivities` WHERE `ActivityId`=ActId;
    DELETE FROM `Activities` WHERE `ActivityId`=ActId;
END $$