DELIMITER $$
CREATE PROCEDURE `cnp_data`.`CreateNewStudent` (IN StudentName   VARCHAR(255),  
												IN RelativeName  VARCHAR(255),
                                                IN RelativeEmail VARCHAR(255))  
BEGIN
	INSERT INTO `Students`(StudentName)
		VALUES (@StudentName);
        
	SELECT @StringId := MAX(StudentId) FROM Students;
	SELECT StudentId FROM Students WHERE StudentId = @StringId INTO @TestId;
        
	INSERT INTO `Schedual` (StudentId)
		VALUES (@TestId);
	INSERT INTO `Relatives` (StudentId, RelativeName, RelativeEmail)
		VALUES (@TestId, @RelativeName, @RelativeEmail);
END $$