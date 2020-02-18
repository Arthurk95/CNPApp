DROP EVENT NewDailyTables;

CREATE EVENT NewDailyTables
ON SCHEDULE
    EVERY 1 DAY
    STARTS '2020-02-17 00:00:01'
  DO
	CALL DailyEventHelper();
