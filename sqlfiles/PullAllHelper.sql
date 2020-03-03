DELIMITER $$

CREATE PROCEDURE `PullAllHelper`()
BEGIN
SELECT ActivityId, ActivityName
FROM Activities
	WHERE Helper = 1
	ORDER BY ActivityName ASC;
END$$