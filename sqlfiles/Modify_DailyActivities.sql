DELIMITER $$
CREATE DEFINER =`abstractPizza`@`%` PROCEDURE `AddDailyActivity`(IN StudId INT, 
												IN ActId INT)
BEGIN
	INSERT INTO DailyActivities (`StudentId`, `CurrentDate`, `ActivityId`)
		VALUES (StudId, NOW(), ActId);
END $$
/*///////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE DailyEventHelper()

BEGIN
  SET @var = DAYNAME(CURRENT_DATE);
  SET @sqlstm = CONCAT("INSERT INTO ClassSession
							(`StudentId` ,  `CurrentDate` )
						 SELECT 
							`StudentId`,
                            CURRENT_DATE
						FROM
							Schedual
						WHERE  
							`", @var, "`= 1;");
	PREPARE stmt FROM @sqlstm;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
	
	SET @sqlstm2 = CONCAT("INSERT INTO Behavior
							(`StudentId` ,  `CurrentDate` )
						 SELECT 
							`StudentId`,
                            CURRENT_DATE
						FROM
							Schedual
						WHERE  
							`", @var, "`= 1 AND CurrentEnroll = 1;");
	PREPARE stmt FROM @sqlstm2;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;

END $$
/*////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE DeleteDailyActivity(IN StuId INT,
								  IN ActId INT)
BEGIN
	DELETE FROM `DailyActivites`
		WHERE StudentId = StuId AND ActivityId = ActId;

END $$
/*////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowStudentDailyActivitiesToday` (IN Id INT)

BEGIN
	SELECT * 
		FROM `DailyActivities`
			JOIN `Activities`
				ON `DailyActivites`.ActivityId=`Activities`.ActivityId
					WHERE `StudentId` = id AND `CurrentDate` = CURRENT_DATE
                    ORDER BY DailyActivites.CurrentTime ASC;
END $$
/*///////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$

CREATE PROCEDURE `PullUnhiddenHelper`()
BEGIN
SELECT ActivityId, ActivityName
FROM Activities
	WHERE Hidden = 0 AND Helper = 1
	ORDER BY ActivityName ASC;
END$$
/*///////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$

CREATE PROCEDURE `PullAllHelper`()
BEGIN
SELECT ActivityId, ActivityName
FROM Activities
	WHERE Helper = 1
	ORDER BY ActivityName ASC;
END$$
/*///////////////////////////////////////////////////////////////////////////////////////////*/