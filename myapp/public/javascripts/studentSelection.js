var selectedStudentIDs = [];
var numSelectedStudents = 0;
var selectedActivityID = undefined;
var SUBMIT_BUTTON_DISPLAY_TYPE = "flex";
var SELECT_BUTTON_DISPLAY_TYPE = "inline-block";
var LIST_DISPLAY_TYPE = "flex";

var footer;
var selectButton;
var backAndSubmit;
var pottyAndSelect;
var pottyButton;
var pottyYesNo;
var toSubmit = false; // if a selection was made
var activitiesHidden = true;
var studentsHidden = true;

$(document).ready(function(){
    footer = document.getElementById("footer");
    pottyAndSelect = document.getElementById("pottyAndSelect");
    selectButton = document.getElementById("selectButton");
    backAndSubmit = document.getElementById("backAndSubmit");
    pottyButton = document.getElementById("pottyBreak");
    pottyYesNo = document.getElementById("pottyYesNo");
})

// a student was selected from the Students list
function studentSelected(studentElement, studentID){
    // the passed student is being de-selected
    if(studentElement.classList.contains("selectedStudent")){
        studentElement.classList.remove("selectedStudent");
        removeStudentFromList(studentID);
        if(numSelectedStudents == 0){
            hideElement(pottyAndSelect);
            hideElement(backAndSubmit);
            hideElement(pottyYesNo);
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
        showElement(backAndSubmit, SUBMIT_BUTTON_DISPLAY_TYPE);
    }
    else{
        showElement(pottyAndSelect, SUBMIT_BUTTON_DISPLAY_TYPE);
        showElement(selectButton, SELECT_BUTTON_DISPLAY_TYPE);
        selectButton.text = "Select " + buttonText;
    }
}

/* Activity <li> element clicked, either make it green or de-select it */
function activitySelected(element, activityId){
    // activity is already selected, deselect it
    if(element.classList.contains("selectedStudent")){
        element.classList.remove("selectedStudent");
        selectedActivityID = undefined;
        hideElement(backAndSubmit);
        hideElement(selectButton);
        hideElement(pottyAndSelect);
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
    hideStartButtons();
    showStudents();
}

// The "Activities" button was pushed when first coming to the page
function startWithActivities(){
    hideStartButtons();
    showActivities();
}

// activity or student(s) was chosen and the "Select" button was clicked
function selectionMade(){
    hideElement(pottyAndSelect);
    
    if(activitiesHidden){ // students were selected first
        hideStudents();
        showActivities();
    }
    else{
        hideActivities();
        showStudents();
    }
    toSubmit = true;
    if(selectedActivityID != undefined){ showButton(""); }
}

// activity and student(s) chosen, submit to database
function submitToDB(){
    
    var theUrl = window.location.href+'/addstudentActivity';

    var data = "&stu=" + selectedStudentIDs;
    data = data + "&act=" + selectedActivityID;
    data = data + "&numStu=" + selectedStudentIDs.length;
    var callback = reloadIt;

    httpPostAsync(theUrl,data,callback);
    
}

// Hides the active list (students or activities) and shows the inactive one
// Also hides the submit/back buttons and shows the select button.
function goBack(){
    if(studentsHidden){
        hideActivities();
        showStudents();
    }
    else{
        hideStudents();
        showActivities();
    }
    
    hideElement(backAndSubmit);
    toSubmit = false;
    showButton(selectButton);
}



function hideStartButtons(){
    document.getElementById("selectionButtons").style.display = "none";
}
function hideElement(element) { 
    element.style.display = "none"; 
}
function showElement(element, displayType) { 
    element.style.display = displayType; 
}

function pottyBreak(){
    hideElement(pottyAndSelect);
    showElement(pottyYesNo, SUBMIT_BUTTON_DISPLAY_TYPE);
}

// accidentFlag is a boolean value. true for accidental, false for not
function submitPottyToDB(button, accidentFlag) {
    var data = `students=${selectedStudentIDs}&accidentFlag=${accidentFlag}`;
    httpPostAsync(`${window.location.href}/add-potty-break`, data, reloadIt);
}