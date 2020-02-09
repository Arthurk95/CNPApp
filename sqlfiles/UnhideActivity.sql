DELIMITER $$
CREATE PROCEDURE `cnp_data`.`UnhideActivity` (IN ActId INT)
BEGIN
UPDATE Activities
	SET Hidden=0
WHERE ActivityId=ActId;
END $$