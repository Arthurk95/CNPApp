
var currentStep = 1;
var stepOne;
var stepTwo;
var currentStudentElement;
var currentStudentData;
var stepTwoTitle; // entire element that contains the title and Review button
var studentsList; // list of all the students on this emailer page
var activities; // the <ul> element that displays the current student's activities
var listOfStudents;
var currentStudentIndex = 0;
var savedList = []; // array with true/false value for if corresponding student is saved
var approvedList = [];
var MAX_STEPS = 2;
var behaviors;
var formElement;
var saveButton;

var APPROVED_COLOR = "theme-color2-light-BG";
var APPROVED_COLOR_DARK = "theme-color2-BG";
var SAVED_COLOR = "theme-color2-light-BG";

var summary;
var header;
var footer;
var reminders;

var twoColumnDivClassList = "flex spaceBetween marginBottom10 width100";

// Init step two data for first student


function toNextStep(){
    if(currentStep < MAX_STEPS){
        currentStep++;
        stepChange();
    }
}

function toPreviousStep(){
    if(currentStep > 1){
        currentStep--;
        stepChange();
    }
}

function stepChange(){
    if(currentStep == 1){
        hideElement(stepTwo);
        showElement(stepOne, "");
    }
    else if(currentStep == 2){
        hideElement(stepOne);
        showElement(stepTwo, "");
    }
}

// another student was selected from the list
function studentSelected(listElement, index){
    if(!savedList[currentStudentIndex]){
        // clicked another student without saving, save student's data to database
    }
    if(!listElement.classList.contains("approved")){
        listElement.classList += " selected";
    }
    
    currentStudentElement.classList.remove("selected");
    currentStudentIndex = index;
    currentStudentElement = listElement;
    currentStudentData = listOfStudents[index];
    
    populateData();
}

// populates the activities and behaviors in the content panel
// of the second step


function populateData(){
    /*
    if(report.approved == true && !stepTwoTitle.parentElement.classList.contains("approved")){
        stepTwoTitle.classList.add("approved")
    }
    else if(report.approved == 0){
        stepTwoTitle.classList.remove("approved");
    }
                var theUrl = window.location.href+'/send';
    */
    var data = `id=${currentStudentData.id}`;
    httpPostAsync(window.location.href+'/refresh-behaviors', data, doNothing);
    

    if(approvedList[currentStudentIndex]){
        setApprovedStyle();
    }
    else{setNormalStyle();}

    stepTwoTitle.getElementsByTagName("p")[0].innerHTML = currentStudentData.name;
    
    $(activities).empty();

    for(var i = 0; i < currentStudentData.listOfActivities.length; i++){
        var li = document.createElement("li");
        li.classList = "padding10px centerText margin10 light-content-dark-BG width70";
        li.innerHTML = currentStudentData.listOfActivities[i].ActivityName;
        
        if(currentStudentData.listOfActivities[i].Helper === 1){
            li.innerHTML += "&nbsp" + "<i class='fas fa-star theme-color2-light-text'></i>"
        }
        activities.appendChild(li);
    }


    var data = `id=${currentStudentData.id}`;
    httpPostAsync(window.location.href + '/refresh-behaviors', data, function (result) {
        // result = JSON.stringify(result)
        result = JSON.parse(result)
        currentStudentData.listOfBehaviors = result;
        var behaviorKeys = Object.keys(currentStudentData.listOfBehaviors);
        var behaviorValues = Object.values(currentStudentData.listOfBehaviors);

        behaviors = document.getElementById('behaviorsList');

        // updates the behaviors dropdown values to the student's values.
        // starts at 4 because that's where first behavior shows up in behaviorKeys
        for(var i = 4; i < behaviorKeys.length; i++){
            var behaviorElement = document.getElementById(behaviorKeys[i]);
            if(behaviorElement != null && behaviorElement != null){
                var element = behaviorElement.getElementsByTagName("select")[0];
                if(element != null && element != null){
                    if(element.name === behaviorKeys[i]){
                        element.value = behaviorValues[i];
                        document.getElementById(behaviorKeys[i] + "-text-box").value = behaviorValues[i + 1];
                        toggleClassIfInputNotEmpty(behaviorKeys[i] + "-text-box", document.getElementById(behaviorKeys[i] + "-note-button"), 'theme-color2-light-BG', 'theme-color4-light-BG');
                    }
                }
            }
        }
    });
    toggleSavedStyle();
}

function checkIfAllApproved(){
    var sendEmailBtn = document.getElementById("sendEmailButton");
    if(allStudentsApproved()){
        toggleStyle(sendEmailBtn, "disabledButton");
    }
    else{
        if(!sendEmailBtn.classList.contains("disabledButton")){toggleStyle(sendEmailBtn, "disabledButton");}
    }
}

function allStudentsApproved(){
    for(var i = 0; i < approvedList.length; i++){
        if(approvedList[i] === false){
            return false;
        }
    }
    return true;
}

function studentApproved(button){
    approvedList[currentStudentIndex] = true;
    toggleApprovedStyle();
    // get all values from form text fields and stuff
    // post it to DB
    // DO NOT RELOAD PAGE AS CALLBACK

    var data = `id=${currentStudentData.id}`;
    httpPostAsync(`/emailer/student-approved/`, data, null);

    formElement.style.display = "none";
}

function setApprovedStyle(){
    if(!stepTwoTitle.classList.contains(APPROVED_COLOR)){
        stepTwoTitle.classList.add(APPROVED_COLOR);
        currentStudentElement.classList.add("approved");
        document.getElementById("reviewButton").classList.remove(APPROVED_COLOR);
    }
}

function setNormalStyle(){
    stepTwoTitle.classList.remove(APPROVED_COLOR);
    currentStudentElement.classList.remove("approved");
    currentStudentElement.classList.add("selected")
    document.getElementById("reviewButton").classList.add(APPROVED_COLOR);
}

// node.js "reports" variable passed to JS
function passToJS(r){
    listOfStudents = r;
    initSavedList();
}

function passSummaryToJS(s){summary = s;}
function passRemindersToJS(r){reminders = r;}
function passHeaderToJS(h){header = h;}
function passFooterToJS(f){footer = f;}

function initApprovedList(){
    for(var i = 0; i < listOfStudents.length; i++){
        if(listOfStudents[i].listOfBehaviors["Approved"] === 1){
            document.getElementById("student" + i).classList.add("approved");
            approvedList[i] = true;
        }
    }
    checkIfAllApproved();
}

// called when emailer page is loaded to fill in content of page
// and initialize all relevant variables
function initEmailerVariables(){
    stepOne = document.getElementById("stepOne");
    stepTwo = document.getElementById("stepTwo");
    hideElement(stepTwo);
    currentStudentElement = document.getElementById("student0");
    if(listOfStudents != undefined) {currentStudentData = listOfStudents[0];}
    stepTwoTitle = document.getElementById("stepTwoTitle");
    studentsList = document.getElementById("listOfStudents");
    activities = document.getElementById("activitiesList");
    saveButton = document.getElementById("saveButtonStep2");
    initApprovedList();
    if(currentStudentElement != null){
        studentSelected(document.getElementById("student0"), 0);
        document.getElementById("student0").classList.add("selected");
        if(approvedList[0]){setApprovedStyle()}
    }
    else{
        stepTwoTitle.getElementsByTagName("p")[0].innerHTML = "No Students";
    }
    
    
}

function initActivities(){
    for(var i = 0; i < listOfStudents[0].listOfActivities.length; i++){
        var li = document.createElement("li");
        li.innerHTML = listOfStudents[0].listOfActivities[i].ActivityName;
        li.classList.add("main-BG")
        activities.appendChild(li);
    }
}

function initSavedList(){
    var list = [];
    for(var i = 0; i < listOfStudents.length; i++){
        list.push(false);
    }

    savedList = list;
    approvedList = list;
}

// Student's behaviors and other stuff was saved,
// so create a list of their behaviors and push it to the
// db. Then change colors of stuff

function studentSaved(behaviors){
    var studentsBehaviorSelection = [];
    var studentsBehaviorNotes = [];
    var behaviorNames = [];

    for(var i = 0; i < behaviors.length; i++){
        var sel = document.getElementById(behaviors[i].name + "Select");
        var note = document.getElementById(behaviors[i].name + "-text-box");
        //child at index 2 is currently the dropdown selection.. more elegant way to do this?
        if(sel.selectedIndex < 0){
            studentsBehaviorSelection.push("");
        }
        else {studentsBehaviorSelection.push(sel.options[sel.selectedIndex].text);}
        studentsBehaviorNotes.push(note.value);
        behaviorNames.push(behaviors[i].name);
    }

    /* Pass behaviors to DB for the student ID
    databaseWizardy(currentStudentData.id, studentsBehaviors);
    */
   var db_data = `id=${currentStudentData.id}&behaviorNames=${behaviorNames}&studentsBehaviorSelection=${studentsBehaviorSelection}&studentsBehaviorNotes=${studentsBehaviorNotes}`;
   httpPostAsync(`/emailer/push-behavior/`, db_data, null);
    
    savedList[currentStudentIndex] = true;

    if(!savedList[currentStudentIndex]){ toggleSavedStyle(); } // isn't already saved
    approvedList[currentStudentIndex] = false;
    toggleApprovedStyle();

    var approveDB = `id=${currentStudentData.id}`;
    httpPostAsync(`/emailer/student-unapproved/`, approveDB, null);
}

function toggleApprovedStyle(){
    if(approvedList[currentStudentIndex]){
        setApprovedStyle();
    }
    else{setNormalStyle();}
    
    checkIfAllApproved();
}

function toggleSaveButtonStyle(){
    if(savedList[currentStudentIndex]){savedStyle();}
    else{unsavedStyle();}
}

function toggleSavedStyle(){
    if(savedList[currentStudentIndex]){savedStyle();}
    else{unsavedStyle();}
}

// changes saveButton style to green to indicate that it's saved
function savedStyle(){
    if(!saveButton.classList.contains(SAVED_COLOR)){
        saveButton.classList.add(SAVED_COLOR);
    }
}

// makes saveButton blue
function unsavedStyle(){
    saveButton.classList.remove(SAVED_COLOR);
}

// Added for when we implement recognizing when a change has been made
// to a student's information. Makes the current student no longer "saved"
function changeMade(){
    if(savedList[currentStudentIndex]){
        savedList[currentStudentIndex] = false;
        toggleSaveButtonStyle();
    }

}

function openReview(rendered_HTML) {
    formElement = document.getElementById('reviewForm');
    var emailReviewElement = document.getElementById('reviewData');
    emailReviewElement.innerHTML = "";
    formElement.style.display = "block";
    formElement.querySelector("#reviewTitle").innerHTML = "Reviewing " + currentStudentData.name;
    emailReviewElement.innerHTML = rendered_HTML;
}


function openEmailReport(results, isDone) {
    formElement = document.getElementById('reportForm');
    formElement.style.display = "block";
    var emailReviewElement = document.getElementById('reportData');
    formElement.querySelector("#reportTitle").innerHTML = "Email Report";

    if (isDone === true) {
        formElement.querySelector('#reportStatus').innerHTML = ""

        results.forEach((result, index) => {
            var row = formElement.querySelector('#reportTable').insertRow(index + 1)
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);

            cell0.innerHTML = result.name;
            cell1.innerHTML = result.emails;
            cell2.innerHTML = result.status;
            cell3.innerHTML = result.message;
        })
    } else {
        formElement.querySelector('#reportStatus').innerHTML = "Generating report..."
    }
}

function createTwoColumnDiv(left, right){
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var div = document.createElement('div');
    div.classList = twoColumnDivClassList;

    p1.innerHTML = left;
    p2.innerHTML = right;
    div.appendChild(p1);
    div.appendChild(p2);
    return div;
}