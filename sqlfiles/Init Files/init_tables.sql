CREATE TABLE Students (
    StudentId INT NOT NULL AUTO_INCREMENT,
    StudentName VARCHAR(255) NOT NULL,
    Img VARCHAR(255),
	Birthdate DATE,
    PRIMARY KEY (StudentId)
);

CREATE TABLE Relatives (
    StudentId INT NOT NULL,
    RelativeName VARCHAR(255) NOT NULL,
    RelativeEmail VARCHAR(255) NOT NULL,
	RelativePhone VARCHAR(20) NOT NULL,
	RelativeName2 VARCHAR(255),
    RelativeEmail2 VARCHAR(255),
	RelativePhone2 VARCHAR(20),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    PRIMARY KEY (StudentId, RelativeName)
);

CREATE TABLE ClassSession (
    StudentId INT NOT NULL,
    CurrentDate DATE NOT NULL DEFAULT (CURRENT_DATE),
	Absent BOOL NOT NULL DEFAULT 0,
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
    PRIMARY KEY(StudentId, CurrentDate)
);

CREATE TABLE Activities(
    ActivityId INT NOT NULL AUTO_INCREMENT,
    ActivityName VARCHAR(255) NOT NULL,
	Hidden BOOL NOT NULL DEFAULT 0,
    PRIMARY KEY (ActivityID)
);

CREATE TABLE DailyActivites (
    StudentId INT NOT NULL,
    CurrentDate DATE NOT NULL,
    ActivityId INT NOT NULL,
    CurrentTime TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (StudentId, CurrentDate) REFERENCES ClassSession(StudentId, CurrentDate),
    FOREIGN KEY (ActivityId) REFERENCES Activities(ActivityId),
    PRIMARY KEY(StudentId, CurrentDate, CurrentTime)
);

CREATE TABLE Behavior (
	StudentId INT NOT NULL,
    CurrentDate DATE NOT NULL,
    SleepingPattern VARCHAR(255),
    EatingHabits VARCHAR(255),
    Attitude VARCHAR(255),
    RestRoomActivity VARCHAR(255),
    FOREIGN KEY (StudentId, CurrentDate) REFERENCES ClassSession(StudentId, CurrentDate),
    PRIMARY KEY(StudentId, CurrentDate)
);

CREATE TABLE DailyStudentNotes (
	StudentId INT NOT NULL,
    CurrentDate DATE NOT NULL,
    StudentNoteId INT NOT NULL,
    NoteContent VARCHAR(512),
    FOREIGN KEY (StudentId, CurrentDate) REFERENCES ClassSession(StudentId, CurrentDate),
    PRIMARY KEY (StudentId, CurrentDate, StudentNoteId)
);

CREATE TABLE Schedual (
    StudentId INT NOT NULL,
    Monday BOOL NOT NULL DEFAULT 0,
    Tuesday BOOL NOT NULL DEFAULT 0,
    Wednesday BOOL NOT NULL DEFAULT 0,
    Thursday BOOL NOT NULL DEFAULT 0,
    Friday BOOL NOT NULL DEFAULT 0,
    Saturday BOOL NOT NULL DEFAULT 0,
    Sunday BOOL NOT NULL DEFAULT 0,
	DayType BOOL NOT NULL DEFAULT 1,
	CurrentEnroll BOOL NOT NULL DEFAULT 1,
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
    PRIMARY KEY (StudentId)
);

CREATE TABLE Administer (
	AdminId INT NOT NULL AUTO_INCREMENT,
    AdminName VARCHAR(255) NOT NULL,
    AdminPass VARCHAR(255) NOT NULL,
    AdminImg VARCHAR(255),
    AdminEmail VARCHAR(255) NOT NULL,
    AdminEmailPass VARCHAR(255) NOT NULL,
    PRIMARY KEY (AdminId)
);

CREATE TABLE AdminNotes(
	AdminId INT NOT NULL,
	CurrentTime DATETIME NOT NULL DEFAULT (CURRENT_DATE),
    AdminNoteId INT NOT NULL,
    NoteContent VARCHAR(512),
    FOREIGN KEY (AdminId) REFERENCES Administer(AdminId),
    PRIMARY KEY (AdminId, AdminNoteId)
);