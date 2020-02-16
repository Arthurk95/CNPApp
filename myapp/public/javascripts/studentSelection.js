var selectedStudentIDs = [];
var numSelectedStudents = 0;
var selectedActivityID = undefined;

var footer;
var selectButton;
var submitButton;
var toSubmit = false;
$(document).ready(function(){
    footer = document.getElementById("footer");
    selectButton = document.getElementById("selectButton");
    submitButton = document.getElementById("submitButton");
})


function selectedStudent(studentElement, studentID){
    // the passed student is being de-selected
    if(studentElement.classList.contains("selectedStudent")){
        studentElement.classList.remove("selectedStudent");
        removeStudentFromList(studentID);
        if(numSelectedStudents == 0){
            hideElement(selectButton);
        }
    }
    // the passed student is being selected
    else {
        studentElement.classList += " selectedStudent";
        addStudentToList(studentID);
        // first selected student -> show "Select Activity" button
        if(numSelectedStudents == 1){
            showButton("Activity");
        }
    }
}

function removeStudentFromList(studentID){
    numSelectedStudents--;
    var indexOf = selectedStudentIDs.indexOf(studentID);
    selectedStudentIDs.splice(indexOf, 1);
}

function addStudentToList(studentID){
    numSelectedStudents++;
    selectedStudentIDs.push(studentID);
}

function showButton(buttonText){
    if(toSubmit){
        showElement(submitButton, "inline-block");
    }
    else{
        showElement(selectButton, "inline-block");
        selectButton.text = "Select " + buttonText;
    }
}

/* Activity <li> element clicked, either make it green or de-select it */
function selectedActivity(element, activityId){
    // activity is already selected, deselect it
    if(element.classList.contains("selectedStudent")){
        element.classList.remove("selectedStudent");
        selectedActivityID = undefined;
        hideElement(submitButton);
        hideElement(selectButton);
    }
    // activity is not selected
    else{
        if(selectedActivityID != undefined){ // another is selected -
            clearActivitySelection();
        }
        
        selectedActivityID = activityId;
        element.classList += "selectedStudent";
        showButton("Students");
    }
}

// Removes any selected Activities (green) since we can only do one at a time
function clearActivitySelection(){
    var activitiesList = document.getElementById("activities");
    activitiesList = activitiesList.getElementsByTagName("li");
    for (var i = 0; i < activitiesList.length; i++){
        if(activitiesList[i].classList.contains("selectedStudent")){
            var oldSelection = activitiesList[i];
            oldSelection.classList.remove("selectedStudent");
            break;
        }
    }
    oldSelection.classList.remove("selectedStudent");
}

function hideActivities(){document.getElementById("activities").style.display = "none";}
function showActivities(){document.getElementById("activities").style.display = "block";}

function hideStudents(){document.getElementById("students").style.display = "none";}
function showStudents(){document.getElementById("students").style.display = "block";}

// The "Students" button was pushed when first coming to the page
function startWithStudents(){
    hideButtons();
    showStudents();
}

function hideButtons(){
    document.getElementById("selectionButtons").style.display = "none";
}

// The "Activities" button was pushed when first coming to the page
function startWithActivities(){
    hideButtons();
    showActivities();
}

// activity or student(s) was chosen
function selectionMade(){
    hideElement(selectButton);
    // students were selected first
    if(selectedActivityID == undefined){
        hideStudents();
        showActivities();
    }
    else{
        hideActivities();
        showStudents();
    }
    toSubmit = true;
}

// activity and student(s) chosen, submit to database
function submitToDB(){
    // do something database-y with selectedStudentIDs and selectedActivityID
}

function hideElement(element) { 
    element.style.display = "none"; 
}
function showElement(element, displayType) { 
    element.style.display = displayType; 
}
