DELIMITER $$
CREATE DEFINER =`abstractPizza`@`%` PROCEDURE `AddDailyActivity`(IN StudId INT, 
												IN ActId INT)
BEGIN
	INSERT INTO DailyActivites (`StudentId`, `CurrentDate`, `ActivityId`)
		VALUES (StudId, CURRENT_DATE, ActId);
END $$