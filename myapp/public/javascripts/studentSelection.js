var selectedStudentIDs = [];
var numSelectedStudents = 0;
var footer = document.getElementById("footer");

function selectedStudent(element, studentID){
    if(element.classList.contains("selectedStudent")){
        element.classList.remove("selectedStudent");
        numSelectedStudents--;
        var indexOf = selectedStudentIDs.indexOf(studentID);
        selectedStudentIDs.splice(indexOf, 1);
        if(numSelectedStudents == 0){
          $(function(){
              $("footer").children().fadeOut("fast");
          })  
        }
    }
    else {
        element.classList += " selectedStudent";
        numSelectedStudents++;
        selectedStudentIDs.push(studentID);
        if(numSelectedStudents == 1){
          $(function(){
              $("footer").children().fadeIn("fast");
          })  
        }
    }
}