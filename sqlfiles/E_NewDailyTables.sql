CREATE EVENT NewDailyTables
ON SCHEDULE
    EVERY 1 DAY
    STARTS (TIMESTAMP(CURRENT_DATE) + INTERVAL 1 DAY)
  DO
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