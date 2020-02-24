DELIMITER $$
CREATE PROCEDURE DeleteDailyActivity(IN StuId INT,
								  IN ActId INT)
BEGIN
	DELETE FROM `DailyActivites`
		WHERE StudentId=StuId AND ActivityId=ActId;

END $$