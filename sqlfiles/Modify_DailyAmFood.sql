DELIMITER $$
CREATE PROCEDURE `cnp_data`.`AddDailyAmFood` (IN main VARCHAR(5000))
BEGIN
INSERT INTO `DailyAmFood` (Dates, MainParagraphs)
	VALUES(CURRENT_DATE, main)
ON DUPLICATE KEY UPDATE
    MainParagraphs = main;
END $$
/*///////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullDailyAmFoodToday` ()
BEGIN
	SELECT MainParagraphs 
		FROM `DailyAmFood`
	WHERE Dates=CURRENT_DATE;
END $$