DELIMITER $$
CREATE PROCEDURE `cnp_data`.`HideTemplateObject` (IN id INT)
BEGIN
UPDATE TemplateObject
	SET Hidden=1
WHERE TemplateId=id;
END $$
/*///////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`UnhideTemplateObject` (IN id INT)
BEGIN
UPDATE TemplateObject
	SET Hidden=0
WHERE TemplateId=id;
END $$
/*////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`DeleteTemplateObject` (IN id INT)
BEGIN
	SELECT NameOf FROM TemplateObject WHERE TemplateId=id INTO @nam;
	SET @nam1 = CONCAT(@nam,"Note");
	SET @sqlstm = CONCAT(
			"ALTER TABLE `Behavior`
				DROP COLUMN `", @nam , "`,
				DROP COLUMN `", @nam1, "`");
	PREPARE stmt FROM @sqlstm;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
	DELETE FROM `TemplateObject` WHERE `TemplateId`=id;
END $$
/*////////////////////////////////////////////////////////////////////////////////////////////////*/
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
	SET @nam = nam;
	SET @nam1 = CONCAT(@nam,"Note");
	SET @sqlstm = CONCAT(
			"ALTER TABLE `Behavior`
				ADD COLUMN `", @nam , "` VARCHAR(45),
				ADD COLUMN `", @nam1, "` VARCHAR(500);");
	PREPARE stmt FROM @sqlstm;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END $$
/*//////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowUnhiddenTemplateObject` ()
BEGIN
SELECT *
FROM TemplateObject
	WHERE Hidden = 0;
END $$
/*///////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowAllTemplateObject` ()
BEGIN
	SELECT * FROM TemplateObject;
END $$