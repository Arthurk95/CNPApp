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
function studentSelected(listElement, studentData, index){
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
    */
    if(approvedList[currentStudentIndex]){
        setApprovedStyle();
    }
    else{setNormalStyle();}

    stepTwoTitle.getElementsByTagName("p")[0].innerHTML = currentStudentData.name;
    
    $(activities).empty();

    for(var i = 0; i < currentStudentData.listOfActivities.length; i++){
        var li = document.createElement("li");
        li.innerHTML = currentStudentData.listOfActivities[i].ActivityName;
        activities.appendChild(li);
    }

    toggleSaveButtonStyle();
}

function studentApproved(button){
    setApprovedStyle();
    approvedList[currentStudentIndex] = true;

    // get all values from form text fields and stuff
    // post it to DB
    // DO NOT RELOAD PAGE AS CALLBACK

    formElement.style.display = "none";
}

function setApprovedStyle(){
    if(!stepTwoTitle.classList.contains("accent2Light-BG")){
        stepTwoTitle.classList.add("accent2Light-BG");
        currentStudentElement.classList.add("approved");
    }
}

function setNormalStyle(){
    stepTwoTitle.classList.remove("accent2Light-BG");
}

// node.js "reports" variable passed to JS
function passToJS(r){
    listOfStudents = r;
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
    saveButton = document.getElementById("saveButton");
    if(currentStudentElement != null){
        currentStudentElement.classList += " selected";
        stepTwoTitle.getElementsByTagName("p")[0].innerHTML = currentStudentElement.innerHTML;
        initActivities();
        initSavedList();
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
        var sel = document.getElementById(behaviors[i].name);
        var note = document.getElementById(`${behaviors[i].name}-text-box`)
        //child at index 2 is currently the dropdown selection.. more elegant way to do this?
        console.log(note.value);
        studentsBehaviorSelection.push(sel.children[1].innerText);
        studentsBehaviorNotes.push(note.value);
        behaviorNames.push(behaviors[i].name);
    }

    /* Pass behaviors to DB for the student ID
    databaseWizardy(currentStudentData.id, studentsBehaviors);
    */
   var db_data = `id=${currentStudentData.id}&behaviorNames=${behaviorNames}&studentsBehaviorSelection=${studentsBehaviorSelection}&studentsBehaviorNotes=${studentsBehaviorNotes}`;
   httpPostAsync(`/emailer/push-behavior/`, db_data, null);
    
    if(!savedList[currentStudentIndex]){ savedStyle(); } // isn't already saved
    savedList[currentStudentIndex] = true;
}


function toggleSaveButtonStyle(){
    if(savedList[currentStudentIndex]){savedStyle();}
    else{unsavedStyle();}
}

// changes saveButton style to green to indicate that it's saved
function savedStyle(){
    if(saveButton.classList.contains("blue2-BG")){
        saveButton.classList.remove("blue2-BG");
        saveButton.classList.add("green2-BG");
        var icon = saveButton.getElementsByClassName("buttonIcon")[0];
        icon.classList.remove("blue3-BG");
        icon.classList.add("green3-BG");
        saveButton.getElementsByTagName("p")[0].innerHTML = "Saved";
    }
}

// makes saveButton blue
function unsavedStyle(){
    if(saveButton.classList.contains("green2-BG")){
        saveButton.classList.add("blue2-BG");
        saveButton.classList.remove("green2-BG");
        var icon = saveButton.getElementsByClassName("buttonIcon")[0];
        icon.classList.add("blue3-BG");
        icon.classList.remove("green3-BG");
        saveButton.getElementsByTagName("p")[0].innerHTML = "Save";
    }
}

// Added for when we implement recognizing when a change has been made
// to a student's information. Makes the current student no longer "saved"
function changeMade(){
    if(savedList[currentStudentIndex]){
        savedList[currentStudentIndex] = false;
        toggleSaveButtonStyle();
    }

}

function openReview(){
    var studentBehaviors; // = getStudentBehaviorsFromDB(currentStudentData.id);
    var summary; // = getSummaryDB(currentStudentData.id);
    formElement = document.getElementById('reviewForm');
    var summaryElement = document.getElementById('summaryText');
    formElement.style.display = "block";
    
    formElement.getElementsByClassName('formTitle')[0].innerHTML = currentStudentData.name;
    
    for(var i = 0; i < studentBehaviors.length; i++){
        summaryElement.append(studentBehaviors[i].name);
    }
}