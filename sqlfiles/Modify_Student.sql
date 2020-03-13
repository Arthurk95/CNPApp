DELIMITER $$
CREATE PROCEDURE `cnp_data`.`CreateNewStudentFinal`(IN StudentN   VARCHAR(255),
														 IN StudB DATE,
														 IN RelativeN1  VARCHAR(255),
														 IN RelativeE1 VARCHAR(255),
                                                         IN RelativeP1 VARCHAR(20),
                                                         IN RelativeN2 VARCHAR(255),
                                                         IN RelativeE2 VARCHAR(255),
                                                         IN RelativeP2 VARCHAR(20),
                                                         IN Mon BOOL,
                                                         IN Tues BOOL, 
                                                         IN Wed BOOL,
                                                         IN Thur BOOL,
                                                         IN Fri BOOL,
                                                         IN Sat BOOL,
                                                         IN Sun BOOL,
                                                         IN Dtype BOOL,
                                                         IN Enroll BOOL)
BEGIN
SET @age = DATEDIFF(CURRENT_DATE, StudB) / 365.25;
	INSERT INTO `Students` (StudentName, Birthdate, Age)
		VALUES (StudentN, StudB, @age);
        
	SELECT MAX(StudentId) FROM Students INTO @StringId;
	SELECT StudentId FROM Students WHERE StudentId = @StringId INTO @TestId;
        
	INSERT INTO `Schedual` (StudentId, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Daytype, CurrentEnroll)
		VALUES (@TestId, Mon, Tues, Wed, Thur, Fri, Sat, Sun, Dtype, Enroll);
	INSERT INTO `Relatives` (StudentId, RelativeName, RelativeEmail, RelativePhone, RelativeName2, RelativeEmail2, RelativePhone2)
		VALUES (@TestId, RelativeN1, RelativeE1, RelativeP1, RelativeN2, RelativeE2, RelativeP2);
	SET @var = DAYNAME(CURRENT_DATE);
    SET @sqlstm = CONCAT("INSERT INTO ClassSession
							(`StudentId` ,  `CurrentDate` )
						 SELECT 
							`StudentId` ,
                            CURRENT_DATE
						FROM
							Schedual
						WHERE  
							`", @var , "`= 1 AND CurrentEnroll = 1 AND `StudentId`= ",@TestId," AND ((`Schedual`.DayType=0 AND CURRENT_TIME < 120000) OR `Schedual`.Daytype=1);");
	PREPARE stmt FROM @sqlstm;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
	
	SET @sqlstm2 = CONCAT("INSERT INTO Behavior
							(`StudentId` ,  `CurrentDate` )
						 SELECT 
							`StudentId`,
                            CURRENT_DATE
						FROM
							Schedual
						WHERE  
							`", @var , "`= 1 AND CurrentEnroll = 1 AND `StudentId`= ",@TestId," AND ((`Schedual`.DayType=0 AND CURRENT_TIME < 120000) OR `Schedual`.Daytype=1);");
	PREPARE stmt FROM @sqlstm2;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END$$
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$

CREATE PROCEDURE `DeleteAllStudents`()
BEGIN
	DELETE FROM `DailyActivites` WHERE `StudentId` >= 0;
    DELETE FROM `Behavior` WHERE `StudentId` >= 0;
    DELETE FROM `DailyStudentNotes` WHERE `StudentId` >= 0;
    DELETE FROM `ClassSession` WHERE `StudentId` >= 0;
    DELETE FROM `Relatives` WHERE `StudentId` >= 0;
    DELETE FROM `Schedual` WHERE `StudentId` >= 0;
    DELETE FROM `Students` WHERE `StudentId` >= 0;
END $$
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
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
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullStudentData` (IN StudId INT)

BEGIN
	SELECT * 
		FROM `Students`, `Schedual`, `Relatives`
			WHERE `Schedual`.StudentId = StudId AND `Relatives`.StudentId = StudId AND `Students`.StudentId = StudId;
END $$
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$

CREATE PROCEDURE `PullUnhiddenStudents`()
BEGIN

SET @DayDate = CURRENT_DATE;
	SELECT Students.StudentId, Students.StudentName
		FROM `Students`
			JOIN `ClassSession`
				ON Students.StudentId=ClassSession.StudentId
					WHERE `CurrentDate` = @DayDate AND `Absent` = 0
					ORDER BY Students.StudentName ASC;
END $$
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$

CREATE PROCEDURE `PullUnhiddenStudentsTime`()
BEGIN
	SET @DayDate = CURRENT_DATE;
			SELECT `Students`.StudentId, `Students`.StudentName
				FROM `Students`
					JOIN `ClassSession`
						ON Students.StudentId=ClassSession.StudentId
					JOIN `Schedual`
						ON `Students`.StudentId=`Schedual`.StudentId
							WHERE `CurrentDate` = @DayDate AND `Absent` = 0 AND ((`Schedual`.DayType=0 AND CURRENT_TIME < 120000) OR `Schedual`.Daytype=1)
						ORDER BY `Students`.StudentName ASC;
END $$
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowAllStudentsInfo` ()

BEGIN
	SELECT *
		FROM `Students`
			JOIN `Schedual`
				ON `Students`.StudentId = `Schedual`.StudentId
			JOIN `Relatives`
				ON `Students`.StudentId = `Relatives`.StudentId
					ORDER BY Students.StudentName ASC;
END $$
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`ShowStudentAttendedDates` (IN Id INT)

BEGIN
SELECT Activities.ActivityName
		FROM `Activities`
			JOIN `DailyActivites`
				ON Activities.ActivityId = DailyActivites.ActivityId
        WHERE DailyActivites.StudentId = Id AND CurrentDate = thisday;
		
END$$
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `UpdateStudent`(IN StudId INT,
														 IN StudentN   VARCHAR(255),
														 IN StudB DATE,
														 IN RelativeN1  VARCHAR(255),
														 IN RelativeE1 VARCHAR(255),
                                                         IN RelativeP1 VARCHAR(20),
                                                         IN RelativeN2 VARCHAR(255),
                                                         IN RelativeE2 VARCHAR(255),
                                                         IN RelativeP2 VARCHAR(20),
                                                         IN Mon BOOL,
                                                         IN Tues BOOL, 
                                                         IN Wed BOOL,
                                                         IN Thur BOOL,
                                                         IN Fri BOOL,
                                                         IN Sat BOOL,
                                                         IN Sun BOOL,
                                                         IN Dtype BOOL,
                                                         IN Enroll BOOL)
BEGIN
SET @age = DATEDIFF(CURRENT_DATE, StudB) / 365.25;
	UPDATE `Students` SET StudentName = StudentN, Birthdate=StudB, Age=@age
		WHERE `Students`.StudentId=StudId;
        
	UPDATE `Schedual` SET Monday=Mon, Tuesday=Tues, Wednesday=Wed, Thursday=Thur, Friday=Fri, Saturday=Sat, Sunday=Sun, Daytype=Dtype, CurrentEnroll=Enroll
		WHERE `Schedual`.StudentId=StudId;
        
	UPDATE `Relatives` SET RelativeName=RelativeN1, RelativeEmail=RelativeE1, RelativePhone=RelativeP1, RelativeName2=RelativeN2, RelativeEmail2=RelativeE2, RelativePhone2=RelativeP2
		WHERE `Relatives`.StudentId=StudId;
	SET @var = DAYNAME(CURRENT_DATE);
    SET @sqlstm = CONCAT("INSERT INTO ClassSession
							(`StudentId` ,  `CurrentDate` )
						 SELECT 
							`StudentId` ,
                            CURRENT_DATE
						FROM
							Schedual
						WHERE  
							`", @var , "`= 1 AND CurrentEnroll = 1 AND `StudentId`= ",@TestId," AND ((`Schedual`.DayType=0 AND CURRENT_TIME < 120000) OR `Schedual`.Daytype=1);");
	PREPARE stmt FROM @sqlstm;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
	
	SET @sqlstm2 = CONCAT("INSERT INTO Behavior
							(`StudentId` ,  `CurrentDate` )
						 SELECT 
							`StudentId`,
                            CURRENT_DATE
						FROM
							Schedual
						WHERE  
							`", @var , "`= 1 AND CurrentEnroll = 1 AND `StudentId`= ",@TestId," AND ((`Schedual`.DayType=0 AND CURRENT_TIME < 120000) OR `Schedual`.Daytype=1);");
	PREPARE stmt FROM @sqlstm2;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END $$
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE UploadStudentImg(IN StuId INT,
								  IN ImgPath VARCHAR(255))
BEGIN
	UPDATE `Students`
		SET Img=ImgPath
			WHERE `Students`.StudentId=StuId;

END $$
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`MarkStudentAbsent` (IN StudId INT)

BEGIN
	UPDATE ClassSession
    SET `Absent` = 1
	WHERE StudentId= StudId AND CurrentDate=CURRENT_DATE;
END $$
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `cnp_data`.`MarkStudentUnabsent` (IN StudId INT)

BEGIN
	UPDATE ClassSession
    SET `Absent` = 0
	WHERE StudentId= StudId AND CurrentDate=CURRENT_DATE;
END $$