DELIMITER $$
CREATE PROCEDURE UploadStudentImg(IN StuId INT,
								  IN ImgPath VARCHAR(255))
BEGIN
	UPDATE `Students`
		SET Img=ImgPath
			WHERE `Students`.StudentId=StuId;

END $$