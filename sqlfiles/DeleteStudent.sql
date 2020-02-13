DELIMITER $$
CREATE PROCEDURE `cnp_data`.`DeleteStudent` (IN StudId INT)

BEGIN
	DELETE FROM `DailyActivities` WHERE `StudentId`=StudId;
    DELETE FROM `Behavior` WHERE `StudentId`=StudId;
    DELETE FROM `DailyStudentNotes` WHERE `StudentId`=StudId;
    DELETE FROM `ClassSession` WHERE `StudentId`=StudId;
    DELETE FROM `Relatives` WHERE `StudentId`=StudId;
    DELETE FROM `Schedual` WHERE `StudentId`=StudId;
    DELETE FROM `Students` WHERE `StudentId`=StudId;
END $$