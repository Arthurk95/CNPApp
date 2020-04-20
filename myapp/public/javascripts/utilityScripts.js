var dropdownToggled = false;


function isDaySelected(day){
    return convertBoolToInt(document.getElementById(day).classList.contains("selectedDay"));
}

function convertBoolToInt(boolVal){
    if(boolVal){
        return 1;
    }
    else return 0;
}

function convertBoolToInt(boolVal){
    if(boolVal){
        return 1;
    }
    else return 0;
}

function weekdaySelected(element){
    if(element.classList.contains("selectedDay")){
      element.classList.remove("selectedDay");
    }
    else{
      element.classList += " selectedDay";
    }
}

function checkboxClicked(element) {
    if(element.classList.contains("checkboxSelected")){
        element.classList.remove("checkboxSelected");
    }
    else{
        element.classList += " checkboxSelected";
    }
}

function checkStudentDayType(element, dayType){
    if(dayType == 0){
      element.classList += " textShadow stripedBackground";
    }
  }

function textAreaAdjust(textArea) {
    textArea.style.height = "1px";
    textArea.style.height = (textArea.style.fontSize + textArea.scrollHeight)+"px";
}


/* FORM FUNCTIONS */

function closeForm(){
    formElement.style.display = "none";
  }

function openForm(formID){
    formElement = document.getElementById(formID);
    formElement.style.display = "block";
}

/* SEARCH FUNCTIONALITY FUNCTIONS */
function toggleSearch(inputID, titleID){
    var inputElement = document.getElementById(inputID);
    var titleElement = document.getElementById(titleID);
    if(inputElement.style.display === "none"){
        inputElement.style.display = "block";
        titleElement.style.display = "none";
    }
    else{
        inputElement.style.display = "none";
        titleElement.style.display = "block";
    }
}

function updateSearch(elementToSearchID, input){
    var filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    var li = document.getElementById(elementToSearchID).getElementsByTagName('li');


    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        var p = li[i].getElementsByTagName("p")[0];
        var txtValue = p.textContent || p.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}