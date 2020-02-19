DELIMITER $$

CREATE PROCEDURE `DeleteAllActivities`()
BEGIN
	DELETE FROM `DailyActivities` WHERE `ActivityId` >= 0;
    DELETE FROM `Activites` WHERE `ActivityId` >= 0;
END $$