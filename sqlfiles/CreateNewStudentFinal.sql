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
	
END$$