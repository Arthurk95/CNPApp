DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullRestRoomNumber` ()
BEGIN
	SELECT StudentId, RestroomActivityNumber
		FROM `Behavior`
	WHERE Dates=CURRENT_DATE;
END $$
/*///////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullRestRoomNumber` ()
BEGIN
	SET @today = CURRENT_DATE;
	UPDATE Behavior SET RestRoomAcitvityNumber=RestRoomActivityNumber+1 WHERE StudentId=Id;
END $$