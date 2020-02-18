DELIMITER $$
CREATE PROCEDURE `cnp_data`.`InsertDailyBehavior` (IN Id INT,
												   IN Sle VARCHAR(255),
												   IN Eat VARCHAR(255),
                                                   IN Att VARCHAR(255),
                                                   IN RestRoom VARCHAR(255))

BEGIN
	SET @today = CURRENT_DATE;
	INSERT INTO Behavior (`StudentId`, `CurrentDate`, `Sleeping Pattern`, `EatingHabits`, `Attitude`, `RestRoomActivity`)
		VALUES (Id, @today, Sle, Eat, Att, RestRoom);
END $$