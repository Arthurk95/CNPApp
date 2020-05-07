
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

var APPROVED_COLOR = "accent2Light-BG";
var APPROVED_COLOR_DARK = "accent2-BG";
var SAVED_COLOR = "accent2Light-BG";

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
        li.classList = "padding10px centerText margin10 lightGray2-BG width35";
        li.innerHTML = currentStudentData.listOfActivities[i].ActivityName;
        
        if(currentStudentData.listOfActivities[i].Helper === 1){
            li.innerHTML += "&nbsp" + "<i class='fas fa-star accent2Light-text'></i>"
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
                        toggleClassIfInputNotEmpty(behaviorKeys[i] + "-text-box", document.getElementById(behaviorKeys[i] + "-note-button"), 'accent2Light-BG', 'accent4Light-BG');
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
    console.log(currentStudentData);
    toggleApprovedStyle();
    // get all values from form text fields and stuff
    // post it to DB
    // DO NOT RELOAD PAGE AS CALLBACK

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
    if(currentStudentElement != null){
        studentSelected(document.getElementById("student0"), 0);
        document.getElementById("student0").classList.add("selected");
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

// function openReview(){
//     var listDivClassList = "flex flexColumn heavyPadding marginBottom30";

//     var studentBehaviors; // = getStudentBehaviorsFromDB(currentStudentData.id);
//     //var summary; // = getSummaryDB(currentStudentData.id);
//     formElement = document.getElementById('reviewForm');
//     var emailReviewElement = document.getElementById('reviewData');
//     emailReviewElement.innerHTML = "";
//     formElement.style.display = "block";
    
//     formElement.querySelector("#reviewTitle").innerHTML = "Reviewing " + currentStudentData.name;

//     var behaviorKeys = Object.keys(currentStudentData.listOfBehaviors);
//     var behaviorValues = Object.values(currentStudentData.listOfBehaviors);

//     emailReviewElement.innerHTML += header;

//     var listDiv = document.createElement('div'); 
//     listDiv.classList = listDivClassList;


//     for(var i = 0; i < reminders.length; i++){
//         listDiv.appendChild(createTwoColumnDiv(reminders[i].title, reminders[i].contents));
//     }

//     emailReviewElement.appendChild(listDiv);

//     listDiv = document.createElement('div');
//     listDiv.classList = listDivClassList;
//     // starts at 4 because index 4 is first behavior
//     // check this using console.log(behaviorKeys)
//     for(var i = 4; i < behaviorKeys.length; i++){ 
//         var tempDiv = document.createElement('div');
//         tempDiv.classList = twoColumnDivClassList;
//         var p = document.createElement('p');

//         if(behaviorValues[i].length < 1){}
//         else{
//             listDiv.appendChild(createTwoColumnDiv(behaviorKeys[i], behaviorValues[i]));
//         }

        
//     }

//     emailReviewElement.appendChild(listDiv);
    
//     emailReviewElement.innerHTML += footer;   
// }

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