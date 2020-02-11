DELIMITER $$
CREATE PROCEDURE `cnp_data`.`CreateDayTriggerWhile` ()
BEGIN
  	SET @ThisEnd=0;
	SET @Count=0;
    SET @ThisId=0;
	SELECT COUNT(*) FROM Schedual INTO @ThisEnd;
	WHILE @Count<@ThisEnd DO
		SELECT StudentId FROM Schedual INTO @ ThisId;
		CALL CreateDayTriggerHelp(@ThisId);
	END WHILE;
END $$