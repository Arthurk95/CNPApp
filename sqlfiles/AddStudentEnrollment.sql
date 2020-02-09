DELIMITER $$
CREATE PROCEDURE `cnp_data`.`AddStudentEnrollment` (IN Student   VARCHAR(255),  
													IN Mon  BOOL,
													IN Tue BOOL,
                                                    IN Wed BOOL,
                                                    IN Thu BOOL,
                                                    IN Fri BOOL,
                                                    IN Sat BOOL,
                                                    IN Sun BOOL)
BEGIN
	UPDATE Schedual 
    SET Monday=Mon,
		Tuesday=Tue,
		Wednesday=Wed,
		Thursday=Thu,
		Friday=Fri,
		Saturday=Sat,
		Sunday=Sun
WHERE StudentId=Student;
END $$