DELIMITER $$

CREATE PROCEDURE `DeleteAllStudents`()
BEGIN
	DELETE FROM `DailyActivites` WHERE `StudentId` >= 0;
    DELETE FROM `Behavior` WHERE `StudentId` >= 0;
    DELETE FROM `DailyStudentNotes` WHERE `StudentId` >=0;
    DELETE FROM `ClassSession` WHERE `StudentId` >= 0;
    DELETE FROM `Relatives` WHERE `StudentId` >= 0;
    DELETE FROM `Schedual` WHERE `StudentId` >= 0;
    DELETE FROM `Students` WHERE `StudentId` >= 0;
END $$