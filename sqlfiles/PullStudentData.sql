DELIMITER $$
CREATE PROCEDURE `cnp_data`.`PullStudentData` (IN StudentID INT)

BEGIN 
  SELECT 
    FROM   'Students', 'Schedule', 'Relatives'
      WHERE 'schedule'.StudentID = StudID  AND 'Relatives'.StudentID = StudID AND 'Students'.StudentID = StudID;


END $$ 