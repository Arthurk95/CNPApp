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

function openDropdown(activeOption){
    var content = activeOption.parentElement.getElementsByClassName("dropdownOptions");

    console.log(content);
    if(content[0].classList.contains("showOptions")){
        content[0].classList.remove("showOptions");
    }
    else {content[0].classList += " showOptions";}
}

function selectedOption(option){
    var dropdown = option.parentElement.parentElement;
    dropdown.getElementsByClassName("activeOption")[0].innerHTML = option.innerHTML;

    var otherOptions = dropdown.getElementsByTagName("a");
    for(var i = 0; i < otherOptions.length; i++){
        if(otherOptions[i].classList.contains("selectedOption")){
            otherOptions[i].classList.remove("selectedOption");
        }
    }
    option.classList += " selectedOption";
}

window.onclick = function(event) {
    if (!event.target.matches('.activeOption')) {
      var dropdowns = document.getElementsByClassName("dropdownOptions");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("showOptions")) {
          openDropdown.classList.remove("showOptions");
        }
      }
    }
}