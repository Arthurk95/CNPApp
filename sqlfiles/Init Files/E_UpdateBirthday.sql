CREATE EVENT UpdateBirthday
ON SCHEDULE
    EVERY 1 DAY
    STARTS '2020-02-17 00:01:00'
  DO
	IF ((CURRENT_DATE, `Students`.Birthdate)/365.25>`Students`.Age)
     THEN
		UPDATE Students
			SET Age=Age+1
			WHERE
	END IF;