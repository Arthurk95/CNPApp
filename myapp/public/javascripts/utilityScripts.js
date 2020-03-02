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