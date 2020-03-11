DELIMITER $$
CREATE PROCEDURE `cnp_data`.`AddDailyLunch` (IN main VARCHAR(5000))
BEGIN
INSERT INTO `DailyLunch` (Dates, MainParagraphs)
	VALUES(CURRENT_DATE, main)
ON DUPLICATE KEY UPDATE
    MainParagraphs = main;
END $$
/*////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullDailyLunchToday` ()
BEGIN
	SELECT MainParagraphs 
		FROM `DailyLunch`
	WHERE Dates=CURRENT_DATE;
END $$