DELIMITER $$
CREATE PROCEDURE `cnp_data`.`UnhideRemindersObject` (IN id INT)
BEGIN
UPDATE `RemindersObject`
	SET Hidden=0
WHERE TemplateId=id;
END $$
/*//////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`DeleteRemindersObject` (IN id INT)
BEGIN
	DELETE FROM `RemindersObject` WHERE `TemplateId`=id;
END $$
/*////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`AddRemindersObject` (IN nam VARCHAR(45),
												 IN main VARCHAR(5000))
BEGIN
INSERT INTO `RemindersObject` (NameOf, MainParagraphs)
	VALUES(nam, main);
END $$
/*////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowUnhiddenRemindersObject` ()
BEGIN
SELECT *
FROM `RemindersObject`
	WHERE Hidden = 0;
END $$
/*//////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowAllRemindersObject` ()
BEGIN
	SELECT TemplateId, NameOf FROM `RemindersObject`;
END $$