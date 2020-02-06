DELIMITER $$
CREATE PROCEDURE `cnp_data`.`CreateNewStudent` (IN StudentName   VARCHAR(255),  
												IN RelativeName  VARCHAR(255),
                                                IN RelativeEmail VARCHAR(255))  
BEGIN
	INSERT INTO `Students`(StudentName, RelativeName)
		VALUES (@StudentName, @RelativeName);
	INSERT INTO `Schedual` (StudentId)
		SELECT last_insert_id()
        FROM Students;
	INSERT INTO `Relatives` (StudentId, RelativeName)
		SELECT last_insert_id(), 
			   RelativeName
		FROM Students;
	IF @RelativeEmail != NULL THEN
		INSERT INTO `Relatives` (RelativeEmail)
			VALUES (@RelativeEmail);
	END IF;
END $$