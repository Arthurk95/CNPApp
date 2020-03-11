CALL AddDailyActivity(39, 57);/*Student ID followed by Activity ID*/
CALL AddDailySummary("Send in summary here");/*Takes in a long string and saves it a daily summary user must write one per day*/
CALL AddDailyLunch("talk about lunch here");/*user write lunch every day here*/
CALL AddDailyAmFood("talk about snacks");/* user writes about snacks eaten*/
CALL AddTemplateObject("title","option 1","option 2","option 3","option 4","option 5");/*ability to create a new template to add at the begining of an email*/
CALL AddRemindersObject("title","long reminder here")/*creates a resueable reminder*/
CALL AddWeatherData("clear", "clear skys", 288.32, 284.32, 282.15, 293.45, 1000, 40, 4, 350, 7);/*main, description, temp, feels like, min temp, max temp, pressure, humidity, wind speed, wind direction, gust*/
CALL CreateNewActivity("ActivityName");
CALL CreateNewStudentFinal("Student Name", "Parent Name1", "ParentEmail@email.com", "Parent Name 2", "Parent2Email@email.com", 0,1,0,1,0,0,0); /* creating student profile page creator, the numbers are the days of the week they are attending just as described before. to not adda parent send the value "" in the name space */
CALL DeleteActivity(2);/*activity id*/
CALL DeleteAllActivities();/*removes all activities from database*/
CALL DeleteAllStudents();/*removes all students from database*/
CALL DeleteDailyActivity(32, 45);/*student id followed by activity id*/
CALL DeleteRemindersObject(3);/*number of the reminder, deletes */
CALL DeleteStudent(39);/*student id*/
CALL DeleteTemplateObject(2);/*template number, deletes a template*/
CALL HideActivity(1);/* hides activities by id number*/
CALL HideTemplateObject(2);/*template id*/
CALL HideReminderObject(4);/*reminder id*/
CALL InsertRestroomActivityNumber(5)/*Student id*/
CALL MarkStudentAbsent(39); /*student id*/
CALL MarkStudentUnabsent(39); /*student id*/
CALL PullAllHelper();/*pulls all helper activities*/
CALL PullDailySummaryToday();/*pulls summary from todays date*/
CALL PullDailyLunchToday();/*pulls daily lunch from today*/
CALL PullDailyAmFoodToday();/*pulls daily snacks from today*/
CALL PullStudentData(39);/*student id*/
CALL PullStudentsAndDayType();/*displays all students and whether they are helf or full day students*/
CALL PullUnhiddenActivites();/* pull all activites that are not hidden by the user(Id, name)*/
CALL PullUnhiddenHelper();/*pulls all unhidden helper activities*/
CALL PullUnhiddenStudents();/*pulls students enrolled on current day, not absent and hides a student if they are only in morning section (Id, name), call this one for list of students to add activities to*/
CALL PullRestRoomNumber();/*pulls all attending students number of bathroom breaks*/
CALL ShowAllActivities();/*pulls full activity list*/
CALL ShowAllRemindersObject();/*shows all reminder names and ids*/
CALL ShowAllStudentsInfo();/*pulls all students and associated student info*/
CALL ShowAllTemplateObject();/*pulls all template names and ids*/
CALL ShowStudentAttendedDates(39);/*shows all the days a student was in class (does not show days absent)*/
CALL ShowStudentDailyActivitiesToday(39); /*Shows all of a students activities that were accomplished today*/
CALL ShowUnhiddenTemplateObject();/*Pulls all info from unhidden templates*/
CALL ShowUnhiddenRemindersObject();/*pulls all info from unhidden reminders*/
CALL UnhideActivity(1);/* unhides activities by id number*/
CALL UnhideTemplateObject(4);/*template id*/
CALL UnhideRemindersObject(2);/*reminders id*/
CALL UpdateStudent(39, "Student Name", "Parent Name1", "ParentEmail@email.com", "Parent Name 2", "Parent2Email@email.com", 0,1,0,1,0,0,0);/* very simmilar to CreateNewStudentFinal but updates information and takes in the value of a StudentID at the begining of the call*/
CALL UploadStudentImg("file.name");/*enters a students picture reference into database*/
CALL ShowFinish6MonthTask();/* pulls all finished tasks in a 6 month period*/
CALL CreateNewTask(1, "task name/info");
CALL CompleteTask(1);/* task number*/
CALL ShowAllUnfinishedTasks();
CALL DeleteTask(1);/*task number*/
CALL UpdateTaskPriority(1);/*Task number*/