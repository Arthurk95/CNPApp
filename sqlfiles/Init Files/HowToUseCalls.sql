CALL AddDailyActivity(39, 57);/*Student ID followed by Activity ID*/
CALL CreateNewActivity("ActivityName");
CALL CreateNewStudent("Student Name", "Parent Name", "ParentEmail@email.com");/*evetually will be replaced with CreateNewStudentFinal*/
CALL CreateNewStudentFinal("Student Name", "Parent Name1", "ParentEmail@email.com", "Parent Name 2", "Parent2Email@email.com", 0,1,0,1,0,0,0); /* creating student profile page creator, the numbers are the days of the week they are attending just as described before. to not adda parent send the value "" in the name space */
CALL DeleteActivity(2);/*activity id*/
CALL DeleteAllActivities();/*removes all activities from database*/
CALL DeleteAllStudents();/*removes all students from database*/
CALL DeleteStudent(39);/*student id*/
CALL HideActivity(1);/* hides activities by id number*/
CALL InsertDailyBehavior(3, "slept well", "ate a little", "was nice today", "did not use the restroom");/* put in student id and up to 255 character description for each activity in provided order*/
CALL MarkStudentAbsent(39); /*student id*/
CALL MarkStudentUnabsent(39); /*student id*/
CALL PullStudentData(39);/*student id*/
CALL PullUnhiddenActivites();/* pull all activites that are not hidden by the user(Id, name)*/
CALL PullUnhiddenStudents(); /*pulls students enrolled on current day and not absent (Id, name), call this one for daily reports*/
CALL PullUnhiddenStudentsTime();/*pulls students enrolled on current day, not absent and hides a student if they are only in morning section (Id, name), call this one for list of students to add activities to*/
CALL ShowAllActivities();/*pulls full activity list*/
CALL ShowAllStudentsInfo();/*pulls all students and associated student info*/
CALL ShowStudentAttendedDates(39);/*shows all the days a student was in class (does not show days absent)*/
CALL ShowStudentDailyActivities(39, "2020-02-14"); /* intended to be used with CALL ShowStudentAttendedDates(), Select a date from the list and all activities will show up for that day*/
CALL ShowStudentDailyActivitiesToday(39); /*Shows all of a students activities that were accomplished today*/
CALL UnhideActivity(1);/* unhides activities by id number*/
CALL UpdateStudent(39, "Student Name", "Parent Name1", "ParentEmail@email.com", "Parent Name 2", "Parent2Email@email.com", 0,1,0,1,0,0,0);/* very simmilar to CreateNewStudentFinal but updates information and takes in the value of a StudentID at the begining of the call*/