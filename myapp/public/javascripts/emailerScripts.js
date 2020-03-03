var currentStep = 1;
var stepOne;
var stepTwo;
var stepThree;
var lastSelectedStudent;
var stepTwoTitle;
var studentsList;
var activities;
var reports;
var currentStudentIndex = 0;


// Init step two data for first student


function toNextStep(){
    currentStep++;
    stepChange();
}

function toPreviousStep(){
    currentStep--;
    stepChange();
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
    step1.style.display = "none";
    step2.style.display = "none";
}

function showStep(step){
    step.style.display = "flex";
}

function showStudentData(listElement, report, index){
    currentStudentIndex = index;
    lastSelectedStudent.classList.remove("selected");
    listElement.classList += "selected";
    lastSelectedStudent = listElement;
    populateData(report);
}

function populateData(report){
    stepTwoTitle.innerHTML = report.name;
    
    $(activities).empty();

    for(var i = 0; i < report.listOfActivities.length; i++){
        var li = document.createElement("li");
        li.innerHTML = report.listOfActivities[i].ActivityName;
        activities.appendChild(li);
    }
}

function studentApproved(id){
    lastSelectedStudent.classList.remove("selected");
    lastSelectedStudent.classList += (" approved");
}

function passToJS(r){
    reports = r;
}

function initEmailerVariables(){
    stepOne = document.getElementById("stepOne");
    stepTwo = document.getElementById("stepTwo");
    stepThree = document.getElementById("stepThree");
    lastSelectedStudent = document.getElementById("student0");
    stepTwoTitle = document.getElementById("stepTwoTitle");
    studentsList = document.getElementById("listOfStudents");
    activities = document.getElementById("activitiesList");
    lastSelectedStudent.classList += " selected";
    stepTwoTitle.innerHTML = lastSelectedStudent.innerHTML;

    initActivities();
}

function initActivities(){
    for(var i = 0; i < reports[0].listOfActivities.length; i++){
        var li = document.createElement("li");
        li.innerHTML = reports[0].listOfActivities[i].ActivityName;
        activities.appendChild(li);
    }
}