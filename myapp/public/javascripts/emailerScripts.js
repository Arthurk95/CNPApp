var currentStep = 1;
var stepOne = document.getElementById("stepOne");
var stepTwo = document.getElementById("stepTwo");
var stepThree = document.getElementById("stepThree");
var lastSelectedStudent = document.getElementById("student0");
var stepTwoTitle = document.getElementById("stepTwoTitle");
var currentStudentIndex = 0;


// Init step two data for first student
lastSelectedStudent.classList += " selected";
stepTwoTitle.innerHTML = lastSelectedStudent.innerHTML;

function toNextStep(){
    currentStep++;
    console.log(stepOne);
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

function showStudentData(listElement, studentName, studentId, index){
    currentStudentIndex = index;
    lastSelectedStudent.classList.remove("selected");
    listElement.classList += "selected";
    lastSelectedStudent = listElement;
    populateData(studentName, studentId);
}

function populateData(studentName, id){
    stepTwoTitle.innerHTML = studentName;
}

function studentApproved(id){
    lastSelectedStudent.classList.remove("selected");
    lastSelectedStudent.classList += (" approved");
}
