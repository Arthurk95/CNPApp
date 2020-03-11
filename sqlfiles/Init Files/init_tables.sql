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
    CurrentDate date NOT NULL DEFAULT NOW(),
	Absent BOOL NOT NULL DEFAULT 0,
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
    PRIMARY KEY(StudentId, CurrentDate)
);

CREATE TABLE Activities(
    ActivityId INT NOT NULL AUTO_INCREMENT,
    ActivityName VARCHAR(255) NOT NULL,
	Hidden BOOL NOT NULL DEFAULT 0,
	Helper BOOL NOT NULL DEFAULT 0,
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
	RestroomActivityNumber INT,
	RestroomAccidentNumber INT,
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

CREATE TABLE Tasks (
	TaskId INT NOT NULL AUTO_INCREMENT,
	Priority INT(2) NOT NULL,
	NoteContent varchar(512),
	Completed BOOL NOT NULL DEFAULT 0,
	CompletedTime DATETIME,
	PRIMARY KEY (TaskId)
  );
  
  CREATE TABLE cnp_data.Weather (
  weatherId INT NOT NULL AUTO_INCREMENT,
  dateTimes TIMESTAMP,
  main VARCHAR(45) NULL,
  description VARCHAR(45) NULL,
  temp FLOAT NULL,
  feels_like FLOAT NULL,
  temp_min FLOAT NULL,
  temp_max FLOAT NULL,
  pressure INT NULL,
  humidity INT NULL,
  wind_speed FLOAT NULL,
  wind_deg INT NULL,
  wind_gust FLOAT NULL,
  PRIMARY KEY (weatherId)
  );
  
  CREATE TABLE TemplateObject (
	TemplateId INT NOT NULL AUTO_INCREMENT,
	Hidden BOOL NOT NULL DEFAULT 0,
	NameOf VARCHAR(45),
	CategoryOne VARCHAR(45),
    CategoryTwo VARCHAR(45),
    CategoryThree VARCHAR(45),
    CategoryFour VARCHAR(45),
	CategoryFive VARCHAR(45),
	PRIMARY KEY (TemplateId)
  );
  
  CREATE TABLE RemindersObject (
	TemplateId INT NOT NULL AUTO_INCREMENT,
	Hidden BOOL NOT NULL DEFAULT 0,
	NameOf VARCHAR(45),
	MainParagraphs VARCHAR(5000),
	PRIMARY KEY (TemplateId)
  );

CREATE TABLE DailySummary (
	Dates TIMESTAMP NOT NULL,
	MainParagraphs VARCHAR(5000),
	PRIMARY KEY (Dates)
  );
  
  CREATE TABLE DailyAmFood (
	Dates TIMESTAMP NOT NULL,
	MainParagraphs VARCHAR(5000),
	PRIMARY KEY (Dates)
  );
  
  CREATE TABLE DailyLunch(
	Dates TIMESTAMP NOT NULL,
	MainParagraphs VARCHAR(5000),
	PRIMARY KEY (Dates)
  );
  
  CREATE TABLE Admins(
	AdminId INT NOT NULL AUTO_INCREMENT,
	Username VARCHAR(45) NOT NULL,
    Passwords VARCHAR(512) NOT NULL,
    Email VARCHAR(45) NOT NULL,
    Names VARCHAR(45) NOT NULL,
    PRIMARY KEY (AdminId)
);