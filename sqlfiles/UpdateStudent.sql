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
END $$