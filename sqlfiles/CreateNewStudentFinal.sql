DELIMITER $$
CREATE PROCEDURE `cnp_data`.`CreateNewStudentFinal`(IN StudentN   VARCHAR(255),  
														 IN RelativeN1  VARCHAR(255),
														 IN RelativeE2 VARCHAR(255),
                                                         IN RelativeN2 VARCHAR(255),
                                                         IN RelativeE2 VARCHAR(255),
                                                         IN Mon BOOL,
                                                         IN Tues BOOL, 
                                                         IN Wed BOOL,
                                                         IN Thur BOOL,
                                                         IN Fri BOOL,
                                                         IN Sat BOOL,
                                                         IN Sun BOOL)
BEGIN
	INSERT INTO `Students`(StudentName)
		VALUES (StudentN);
        
	SELECT @StringId := MAX(StudentId) FROM Students;
	SELECT StudentId FROM Students WHERE StudentId = @StringId INTO @TestId;
        
	INSERT INTO `Schedual` (StudentId, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
		VALUES (@TestId, Mon, Tues, Wed, Thur, Fri, Sat, Sun);
	IF (RelativeN1 != "")
    THEN
		INSERT INTO `Relatives` (StudentId, RelativeName, RelativeEmail)
			VALUES (@TestId, RelativeN1, RelativeE1);
	END IF;
    IF (RelativeN2 != "")
    THEN
		INSERT INTO `Relatives` (StudentId, RelativeName, RelativeEmail)
			VALUES (@TestId, RelativeN2, RelativeE2);
	END IF;
	
END$$