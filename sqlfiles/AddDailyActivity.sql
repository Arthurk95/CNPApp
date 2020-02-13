DELIMITER $$
CREATE PROCEDURE `cnp_data`.`AddDailyActivity` (IN StudId INT, 
												IN ActId INT)

BEGIN
	INSERT INTO DailyActivies (`StudentId`, `CurrentDate`, `ActivityId`, `CurrentTime`)
		VALUES (StudId, CURRENT_DATE, ActId, TIMESTAMP);
END $$