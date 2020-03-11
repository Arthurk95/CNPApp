DELIMITER $$
CREATE PROCEDURE `cnp_data`.`AddDailySummary` (IN main VARCHAR(5000))
BEGIN
INSERT INTO `DailySummary` (Dates, MainParagraphs)
	VALUES(CURRENT_DATE, main)
ON DUPLICATE KEY UPDATE
    MainParagraphs = main;
END $$
/*////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullDailySummaryToday` ()
BEGIN
	SELECT MainParagraphs 
		FROM `DailySummary`
	WHERE Dates=CURRENT_DATE;
END $$