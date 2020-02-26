DELIMITER $$
CREATE DEFINER =`abstractPizza`@`%` PROCEDURE `CreateNewActivity`(IN ActivityN   VARCHAR(255))

BEGIN
	INSERT INTO `Activities`(ActivityName)
		VALUES (ActivityN);
END $$