 CREATE TABLE MainObject (
	TemplateId INT NOT NULL AUTO_INCREMENT,
	Selected BOOL NOT NULL DEFAULT 0,
	NameOf VARCHAR(45),
	MainParagraphs VARCHAR(2000),
	PRIMARY KEY (TemplateId)
  );
  
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`SelectMainObject` (IN id INT)
BEGIN
UPDATE MainObject
	SET Selected=1
WHERE TemplateId=id;
UPDATE MainObject
	SET Selected=0
WHERE TemplateId!=id;
END $$

DELIMITER $$
CREATE PROCEDURE `cnp_data`.`DeleteMainObject` (IN id INT)
BEGIN
	DELETE FROM `MainObject` WHERE `TemplateId`=id;
END $$

DELIMITER $$
CREATE PROCEDURE `cnp_data`.`AddMainObject` (IN nam VARCHAR(45),
											 IN main VARCHAR(5000))
BEGIN
INSERT INTO `MainObject` (NameOf, MainParagraphs)
	VALUES(nam, main);
END $$

DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowSelectedMainObject` ()
BEGIN
SELECT *
FROM `MainObject`
	WHERE Selected = 1;
END $$

DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowAllRemindersObject` ()
BEGIN
	SELECT TemplateId, NameOf FROM RemindersObject;
END $$