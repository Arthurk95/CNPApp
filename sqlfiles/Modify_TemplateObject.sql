DELIMITER $$
CREATE PROCEDURE `cnp_data`.`HideTemplateObject` (IN id INT)
BEGIN
UPDATE TemplateObject
	SET Hidden=1
WHERE TemplateId=id;
END $$
/////////////////////////////////////////////////////////////////////////////////////////////////
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`UnhideTemplateObject` (IN id INT)
BEGIN
UPDATE TemplateObject
	SET Hidden=0
WHERE TemplateId=id;
END $$
//////////////////////////////////////////////////////////////////////////////////////////////////
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`DeleteTemplateObject` (IN id INT)
BEGIN
	DELETE FROM `TemplateObject` WHERE `TemplateId`=id;
END $$
//////////////////////////////////////////////////////////////////////////////////////////////////
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`AddTemplateObject` (IN nam VARCHAR(45),
												 IN c1 VARCHAR(45),
                                                 IN c2 VARCHAR(45),
                                                 IN c3 VARCHAR(45),
                                                 IN c4 VARCHAR(45),
                                                 IN c5 VARCHAR(45))
BEGIN
INSERT INTO TemplateObject (NameOf, CategoryOne, CategoryTwo, CategoryThree, CategoryFour, CategoryFive)
	VALUES(nam, c1, c2, c3, c4, c5);
END $$
////////////////////////////////////////////////////////////////////////////////////////////////////
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowUnhiddenTemplateObject` ()
BEGIN
SELECT *
FROM TemplateObject
	WHERE Hidden = 0;
END $$
/////////////////////////////////////////////////////////////////////////////////////////////////////
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowAllTemplateObject` ()
BEGIN
	SELECT * FROM TemplateObject;
END $$