CALL CreateNewActivity("ActivityName");
CALL CreateNewStudent("Student Name", "Parent Name", "ParentEmail@email.com");
CALL AddStudentEnrollment(39, 0, 1, 0, 1, 0, 0, 0); /*(student id, monday, tuesday, wednesday, thursday, friday, saturday, sunday) stored as 0 if not attendeding 1 if attending*/
CALL HideActivity(1);/* hides activities by id number*/
CALL UnhideActivity(1);/* unhides activities by id number*/
CALL PullUnhiddenActivites();/* pull all activites that are not hidden by the user*/
CALL PullUnhiddenStudents(); /*pulls students enrolled on current day and not absent (Id, name)*/
CALL CreateNewStudentFinal("Student Name", "Parent Name1", "ParentEmail@email.com", "Parent Name 2", "Parent2Email@email.com", 0,1,0,1,0,0,0); /* creating student profile page creator, the numbers are the days of the week they are attending just as described before. to not adda parent send the value "" in the name space */
CALL AddDailyActivity(39, 57); /*Student ID followed by Activity ID*/
CALL MarkStudentAbsent(39); /*student id*/
CALL MarkStudentUnabsent(39); /*student id*/
CALL DeleteStudent(39);/*student id*/
CALL DeleteActivity(2);/*activity id*/
CALL ShowAllStudents();/*Pulls full student roster*/
CALL ShowAllActivities();/*pulls full activity list*/