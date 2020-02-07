DELIMITER $$
CREATE PROCEDURE `cnp_data`.`CreateNewActivity` (IN ActivityName   VARCHAR(255))  
BEGIN
	INSERT INTO `Activities`(ActivityName)
		VALUES (@ActivityName);
END $$