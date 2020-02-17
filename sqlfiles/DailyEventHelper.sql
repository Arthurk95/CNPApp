CREATE PROCEDURE DoDailyEventHelper

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

END $$