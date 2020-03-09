var currentStep = 1;
var stepOne;
var stepTwo;
var stepThree;
var currentStudentElement;
var currentStudentData;
var stepTwoTitle;
var studentsList;
var activities;
var reports;
var currentStudentIndex = 0;
var MAX_STEPS = 3;
var behaviors;
var formElement;

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
        hideSteps(stepTwo, stepThree);
        showStep(stepOne);
    }
    else if(currentStep == 2){
        hideSteps(stepOne, stepThree);
        showStep(stepTwo);
    }
    else if(currentStep == 3){
        hideSteps(stepOne, stepTwo);
        showStep(stepThree);
    }
}


function hideSteps(step1, step2){
    step1.classList.add("displayNone");
    step2.classList.add("displayNone");
}

function showStep(step){
    step.classList.remove("displayNone");
}

function showStudentData(listElement, report, index){
    
    if(!listElement.classList.contains("approved")){

        listElement.classList += " selected";
    }
    
    currentStudentElement.classList.remove("selected");
    currentStudentIndex = index;
    currentStudentElement = listElement;
    populateData(report);
}

function populateData(report){
    /*
    if(report.approved == true && !stepTwoTitle.parentElement.classList.contains("approved")){
        stepTwoTitle.parentElement.classList.add("approved")
    }
    else if(report.approved == 0){
        stepTwoTitle.parentElement.classList.remove("approved");
    }
    */
    currentStudentData = report;
    stepTwoTitle.innerHTML = report.name;
    
    $(activities).empty();

    for(var i = 0; i < report.listOfActivities.length; i++){
        var li = document.createElement("li");
        li.innerHTML = report.listOfActivities[i].ActivityName;
        activities.appendChild(li);
    }
}

function studentApproved(button){
    document.getElementById('stepTwoTitle').classList.add("green3-BG");
    currentStudentElement.classList.add("approved");

    // get all values from form text fields and shit
    // post it to DB
    // DO NOT RELOAD PAGE AS CALLBACK


    formElement.style.display = "none";
}

function passToJS(r){
    reports = r;
}

function initEmailerVariables(){
    stepOne = document.getElementById("stepOne");
    stepTwo = document.getElementById("stepTwo");
    stepThree = document.getElementById("stepThree");
    currentStudentElement = document.getElementById("student0");
    currentStudentData = reports[0];
    stepTwoTitle = document.getElementById("stepTwoTitle");
    studentsList = document.getElementById("listOfStudents");
    activities = document.getElementById("activitiesList");
    if(currentStudentElement != null){
        currentStudentElement.classList += " selected";
        stepTwoTitle.innerHTML = currentStudentElement.innerHTML;
        initActivities();
    }
    else{
        stepTwoTitle.innerHTML = "No Students";
    }

}

function initActivities(){
    for(var i = 0; i < reports[0].listOfActivities.length; i++){
        var li = document.createElement("li");
        li.innerHTML = reports[0].listOfActivities[i].ActivityName;
        activities.appendChild(li);
    }
}

function studentSaved(clickedButton, behaviors){

    var studentsBehaviors = [];


    for(var i = 0; i < behaviors.length; i++){
        var sel = document.getElementById(behaviors[i].name);
        if(sel.selectedIndex != undefined){
            studentsBehaviors.push(sel.options[sel.selectedIndex].text);
        }
        else {
            studentsBehaviors.push("None");
        }

    }
    

    /* Pass behaviors to DB for the student ID
    databaseWizardy(currentStudentData.id, studentsBehaviors);
    */

    clickedButton.classList.remove("blue2-BG");
    clickedButton.classList.add("green2-BG");
    var icon = clickedButton.getElementsByClassName("buttonIcon")[0];
    icon.classList.remove("blue3-BG");
    icon.classList.add("green3-BG");
    clickedButton.getElementsByTagName("p")[0].innerHTML = "Saved";
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