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
      element.classList += " stripedBackground";
    }
  }

function textAreaAdjust(textArea) {
    textArea.style.height = "1px";
    textArea.style.height = (textArea.style.fontSize + textArea.scrollHeight)+"px";
}

function toggleDropdown(activeOption){
    dropdownToggled = !dropdownToggled;
    var otherOptions = activeOption.parentElement.getElementsByTagName("a");
    var arrow = activeOption.parentElement.getElementsByClassName("arrow")[0];
    var selectedHeight = activeOption.offsetHeight;
    var startingPosition = selectedHeight;

    if(dropdownToggled){arrow.classList += " arrowRotated";}
    else{arrow.classList.remove("arrowRotated");}

    for(var i = 0; i < otherOptions.length; i++){
        if(otherOptions[i] == activeOption){}
        else{
            if(dropdownToggled){
                otherOptions[i].style.top = startingPosition+'px';
                otherOptions[i].classList += " showOption";
                startingPosition += otherOptions[i].offsetHeight;
                
            }
            else {
                otherOptions[i].classList.remove("showOption");
                otherOptions[i].style.top = 0;
            } 
        }
    }
}

function selectedOption(option){
    if(option.classList.contains("selectedOption")){toggleDropdown(option)} // already selected, do nothing
    else{
        option.style.top = 0;
        var dropdown = option.parentElement;
        var otherOptions = dropdown.getElementsByTagName("a");
        for(var i = 0; i < otherOptions.length; i++){
            if(otherOptions[i].classList.contains("selectedOption")){
                otherOptions[i].classList.remove("selectedOption");
                otherOptions[i].classList += " showOption";
            }
        }
        option.classList += " selectedOption";
        toggleDropdown(option);
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.activeOption')) {
      var dropdowns = document.getElementsByClassName("dropdownOptions");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("showOption")) {
          openDropdown.classList.remove("showOption");
        }
      }
    }
}