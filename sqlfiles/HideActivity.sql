DELIMITER $$
CREATE PROCEDURE `cnp_data`.`HideActivity` (IN ActId INT)
BEGIN
UPDATE Activities
	SET Hidden=1
WHERE ActivityId=ActId;
END $$