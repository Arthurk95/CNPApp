DELIMITER $$
CREATE PROCEDURE `CreateNewActivity`(IN ActivityN   VARCHAR(255)
									 IN helpr BOOL)

BEGIN
	INSERT INTO `Activities`(ActivityName, Helper)
		VALUES (ActivityN, helpr);
END $$
/*///////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`DeleteActivity` (IN ActId INT)

BEGIN
	DELETE FROM `DailyActivities` WHERE `ActivityId`=ActId;
    DELETE FROM `Activities` WHERE `ActivityId`=ActId;
END $$
/*//////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `DeleteAllActivities`()
BEGIN
	DELETE FROM `DailyActivities` WHERE `ActivityId` >= 0;
    DELETE FROM `Activites` WHERE `ActivityId` >= 0;
END $$
/*//////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`HideActivity` (IN ActId INT)
BEGIN
UPDATE Activities
	SET Hidden=1
WHERE ActivityId=ActId;
END $$
/*/////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullUnhiddenActivities` ()  
BEGIN
SELECT ActivityId, ActivityName
FROM Activities
	WHERE Hidden = 0 AND Helper = 0
	ORDER BY ActivityName ASC;
END $$
/*/////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowAllActivities` ()

BEGIN
	Select * FROM Activities
	ORDER BY ActivityName ASC;
END $$
/*/////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`UnhideActivity` (IN ActId INT)
BEGIN
UPDATE Activities
	SET Hidden=0
WHERE ActivityId=ActId;
END $$