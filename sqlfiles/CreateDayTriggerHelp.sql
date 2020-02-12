DELIMITER $$
CREATE PROCEDURE `cnp_data`.`CreateDayTriggerHelp` (IN ThisId INT)
BEGIN

	SET @DayName = DAYNAME(CURRENT_DATE);
	IF (SELECT ThisId FROM Schedual WHERE @DayName=1)=true
        THEN
			INSERT INTO ClassSession (StudentId, CurrentDate)
				VALUES (ThisId, CURRENT_DATE);
		END IF;
END $$