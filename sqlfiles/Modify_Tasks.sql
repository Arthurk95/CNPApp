DELIMITER $$
CREATE PROCEDURE `CompleteTask`()

BEGIN
	UPDATE `Tasks`SET Completed=1, CompletedTime=NOW() WHERE TaskId=id;
END $$
/*//////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `CreateNewTask`(IN pri INT,
								 IN con VARCHAR(45))
BEGIN
	INSERT INTO `Tasks`(Priority, NoteContent)
		VALUES (pri, con);
END$$
/*//////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `ShowFinished6MonthsTask`()

BEGIN
	SELECT TaskId, NoteContent CompletedTime FROM Tasks WHERE Completed=1 AND CompletedTime > DATE_SUB(now(), INTERVAL 6 MONTH);
END $$
/*//////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `ShowAllUnfinishedTasks`()

BEGIN
	SELECT TaskId, Priority, NoteContent FROM Tasks WHERE Completed=0;
END $$
/*//////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `DeleteTask`(IN id INT)

BEGIN
	DELETE FROM `Tasks` WHERE `TaskId`=id;
END $$
/*//////////////////////////////////////////////////////////////////////////////////*/
DELIMITER $$
CREATE PROCEDURE `UpdatePriority`(IN id INT,
								  IN pri INT)

BEGIN
	UPDATE `Tasks`SET Priority=pri WHERE TaskId=id;
END $$