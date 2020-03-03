DELIMITER $$

CREATE PROCEDURE `PullUnhiddenHelper`()
BEGIN
SELECT ActivityId, ActivityName
FROM Activities
	WHERE Hidden = 0 AND Helper = 1
	ORDER BY ActivityName ASC;
END$$