var selectedStudentIDs = [];
var numSelectedStudents = 0;
var selectedActivityIDs = [];
var numSelectedActivities = 0;
var SUBMIT_BUTTON_DISPLAY_TYPE = "flex";
var SELECT_BUTTON_DISPLAY_TYPE = "inline-block";
var LIST_DISPLAY_TYPE = "flex";

var studentStep = 0;
var activityStep = 0;

var currentStep = 1;
var FINAL_STEP = 2;

var nextButton;
var backButton;
var pottyButton;
var pottyYesNo;
var students;
var activities;
var submitButton;
var toSubmit = false; // if a selection was made
var activitiesHidden = true;
var studentsHidden = true;

$(document).ready(function(){
    backButton = document.getElementById('backButton');
    submitButton = document.getElementById('submitButton');
    students = document.getElementById('students');
    activities = document.getElementById('activities');
    nextButton = document.getElementById("nextButton");
    pottyButton = document.getElementById("pottyBreak");
    pottyYesNo = document.getElementById("pottyYesNo").getElementsByTagName('a');
})

// a student was selected from the Students list
function studentSelected(studentElement, studentID){
    // the passed student is being de-selected
    if(studentElement.classList.contains("selectedStudent")){
        studentElement.classList.remove("selectedStudent");
        removeStudentFromList(studentID);
        if(numSelectedStudents == 0){
            hideButtons();
        }
    }
    // the passed student is being selected
    else {
        studentElement.classList.add("selectedStudent");
        addStudentToList(studentID);
        // first selected student -> show "Select Activity" button
        if(numSelectedStudents == 1){
            showButtons();
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

function removeActivityFromList(activityID){
    numSelectedActivities--;
    var indexOf = selectedActivityIDs.indexOf(activityID);
    selectedActivityIDs.splice(indexOf, 1);
}

function addActivityToList(activityID){
    numSelectedActivities++;
    selectedActivityIDs.push(activityID);
}

/* Activity <li> element clicked, either make it green or de-select it */
function activitySelected(element, activityId){
    // activity is already selected, deselect it
    if(element.classList.contains("selectedStudent")){
        element.classList.remove("selectedStudent");
        removeActivityFromList(activityId);
        if(numSelectedActivities == 0){
            hideButtons();
        }
    }
    // activity is not selected
    else{

        addActivityToList(activityId);
        element.classList.add("selectedStudent");

        showButtons();
    }
}

function showButtons(){
    if(studentStep === FINAL_STEP){ // activities chosen first
        if(currentStep === studentStep){ // step 2: To submit
            if(selectedStudentIDs.length != 0){
                showElement(submitButton);
                showElement(backButton);
            }
            
        }
        else{ // step 1: activities
            showElement(nextButton);
        }
    }
    else{ // students chosen first
        if(currentStep === activityStep){ // step 2: To submit
            if(selectedActivityIDs.length > 0){
                showElement(submitButton);
                showElement(backButton);
            }
            
        }
        else{ // step 1: Students
            showElement(pottyButton);
            showElement(nextButton);
        }
    }
}

function hideButtons(){
    hideElement(submitButton);
    hideElement(nextButton);
    hideElement(pottyButton);
    hideElement(backButton);
    hidePotty();
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

function hideActivities(){
    document.getElementById("activities").style.display = "none";
    activitiesHidden = true;
}
function showActivities(){
    document.getElementById("activities").style.display = LIST_DISPLAY_TYPE;
    activitiesHidden = false;
}

function hideStudents(){
    document.getElementById("students").style.display = "none";
    studentsHidden = true;
}
function showStudents(){
    document.getElementById("students").style.display = LIST_DISPLAY_TYPE;
    studentsHidden = false;
}

// The "Students" button was pushed when first coming to the page
function startWithStudents(){
    activityStep = 2;
    studentStep = 1;
    hideStartButtons();
    showStudents();
}

// The "Activities" button was pushed when first coming to the page
function startWithActivities(){
    activityStep = 1;
    studentStep = 2;
    hideStartButtons();
    showActivities();
}

// activity or student(s) was chosen and the "Select" button was clicked
function nextStep(){
    hideButtons();
    currentStep++;
    if(currentStep === activityStep){ // students were selected first
        hideStudents();
        showActivities();
    }
    else{
        hideActivities();
        showStudents();
    }
    toSubmit = true;
    showButtons();
}

// activity and student(s) chosen, submit to database
function submitToDB(){
    
    var theUrl = window.location.href+'/addstudentActivity';

    var data = "stu=" + selectedStudentIDs + "&act=" + selectedActivityIDs + "&numStu=" + selectedStudentIDs.length +
        "&numAct=" + selectedActivityIDs.length;
    var callback = reloadIt;
    console.log(theUrl,data,callback);
    httpPostAsync(theUrl,data,callback);
    
}

// Hides the active list (students or activities) and shows the inactive one
// Also hides the submit/back buttons and shows the select button.
function goBack(){
    currentStep--;
    if(studentsHidden){
        hideActivities();
        showStudents();
    }
    else{
        hideStudents();
        showActivities();
    }
    
    hideButtons();
    showButtons();
    toSubmit = false;
}

function hideStartButtons(){
    document.getElementById("selectionButtons").style.display = "none";
}

function pottyBreak(){
    hideButtons();
    showPotty();
}

function showPotty(){
    for(var i = 0; i < pottyYesNo.length; i++){
        showElement(pottyYesNo[i]);
    }
}

function hidePotty(){
    for(var i = 0; i < pottyYesNo.length; i++){
        hideElement(pottyYesNo[i]);
    }
}

// accidentFlag is a boolean value. true for accidental, false for not
function submitPottyToDB(button, accidentFlag) {
    var data = `students=${selectedStudentIDs}&accidentFlag=${accidentFlag}`;
    httpPostAsync(`${window.location.href}/add-potty-break`, data, reloadIt);
}