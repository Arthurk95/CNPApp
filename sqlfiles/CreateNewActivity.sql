DELIMITER $$
CREATE PROCEDURE `cnp_data`.`CreateNewActivity` (IN ActivityN   VARCHAR(255))
BEGIN
	INSERT INTO `Activities`(ActivityName)
		VALUES (ActivityN);
END $$