CREATE TABLE Students (
    StudentId INT NOT NULL AUTO_INCREMENT,
    StudentName VARCHAR(255) NOT NULL,
    img LONGBLOB,
    RelativeName VARCHAR(255) NOT NULL,
    PRIMARY KEY (StudentId)
);

CREATE TABLE Relatives (
    StudentId INT NOT NULL,
    RelativeName VARCHAR(255) NOT NULL,
    RelativeEmail VARCHAR(255),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);

CREATE TABLE ClassSession (
    StudentId INT NOT NULL,
    CurrentDate DATE DEFAULT (getdate()),
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
    CONSTRAINT Attended PRIMARY KEY(StudentId, CurrentDate)
);

CREATE TABLE Activities(
    ActivityId INT NOT NULL AUTO_INCREMENT,
    ActivityName VARCHAR(255) NOT NULL,
    PRIMARY KEY (ActivityID)
);

CREATE TABLE DailyActivites (
    StudentId INT NOT NULL,
    CurrentDate DATE NOT NULL,
    ActivityId INT NOT NULL,
    CurrentTime DATETIME DEFAULT (getdate()),
    FOREIGN KEY (CurrentDate) REFERENCES ClassSession(CurrentDate),
    FOREIGN KEY (StudentID) REFERENCES ClassSession(StudentId),
    FOREIGN KEY (ActivityId) REFERENCES Activities(ActivityId),
    PRIMARY KEY(StudentID, CurrentTime)
);

CREATE TABLE Schedual (
    StudentID INT NOT NULL,
    Monday BOOL,
    Tuesday BOOL,
    Wednesday INT,
    Thursday INT,
    Friday INT,
    Saturday INT,
    Sunday INT,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentId)
);