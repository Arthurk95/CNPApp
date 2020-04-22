var dropdownToggled = false;


function isDaySelected(day){
    return convertBoolToInt(document.getElementById(day).classList.contains("selectedElement"));
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

function selectableSelected(element){
    if(element.classList.contains("selectedElement")){
      element.classList.remove("selectedElement");
    }
    else{
      element.classList += " selectedElement";
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

function isToggled(id){
    return convertBoolToInt(document.getElementById(id).classList.contains('toggled'));
}

function toggleableToggled(element){
    var parent = element.parentElement;
    var others = parent.getElementsByTagName('a');
    if(element.classList.contains('toggled')){
        if(others.length === 1){
            element.classList.remove("toggled");
        }
    }
    else{
        for(var i = 0; i < others.length; i++){
            others[i].classList.remove('toggled');
        }
        element.classList.add('toggled');
    }
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
        if(p === undefined){}
        else{
            var txtValue = p.textContent || p.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
        
    }
}