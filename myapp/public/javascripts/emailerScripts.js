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
    
    lastSelectedStudent.classList.remove("selected");
    currentStudentIndex = index;
    lastSelectedStudent = listElement;
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
    stepTwoTitle.innerHTML = report.name;
    
    $(activities).empty();

    for(var i = 0; i < report.listOfActivities.length; i++){
        var li = document.createElement("li");
        li.innerHTML = report.listOfActivities[i].ActivityName;
        activities.appendChild(li);
    }
}

function studentApproved(button){
    button.parentElement.classList.add("green3-BG")
    lastSelectedStudent.classList.add("approved");
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
    if(lastSelectedStudent != null){
        lastSelectedStudent.classList += " selected";
        stepTwoTitle.innerHTML = lastSelectedStudent.innerHTML;
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