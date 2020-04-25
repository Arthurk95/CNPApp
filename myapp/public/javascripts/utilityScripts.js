var dropdownToggled = false;


function hideElement(element){
    element.style.display = "none";
}

function toggleElement(element){
    if(isElementHidden(element)){
        showElement(element);
    }
    else {hideElement(element);}
}

function showElement(element){ element.style.display = ""; }
function showElement(element, displayType){
    if(displayType === undefined || displayType === null){displayType = "";} 
    element.style.display = displayType;
}

function isElementHidden(element){return (element.style.display === "none");}

function isDaySelected(day){
    return convertBoolToInt(document.getElementById(day).classList.contains("selectedElement"));
}

function toggleSelect(ID){
    var sel = document.getElementById(ID);
    var selSpan = sel.parentElement.getElementsByTagName('span')[0];

    toggleElement(selSpan);
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

// Half day is 0
function checkStudentDayType(element, dayType){
    if(dayType == 0){
      element.classList += " stripedBackground";
    }
  }

function textAreaAdjust(textArea) {
    textArea.style.height = "1px";
    textArea.style.height = (textArea.style.fontSize + textArea.scrollHeight)+"px";
}

// Toggles between two elements (not related to toggleable CSS class)
function toggleBetweenElements(ID, otherID){
    var element = document.getElementById(ID);
    var otherElement = document.getElementById(otherID);
    if(isElementHidden(element)){
        hideElement(otherElement, "");
        showElement(element, "");
    }
    else{
        hideElement(element);
        showElement(otherElement);
    }

}

/* --------------- TOGGLEABLE (CSS) FUNCTIONS --------------- */

// id = HTML ID of element to check
function isToggled(id){
    return convertBoolToInt(document.getElementById(id).classList.contains('toggled'));
}

/* Toggles the passed element.
    Untoggles any other toggleable elements (if any) that are
    contained within its parent. */
function toggleableToggled(element){
    var parent = element.parentElement;
    var others = parent.getElementsByTagName('a');
    if(element.classList.contains('toggled')){ // already toggled
        if(others.length === 1){ // the only toggleable child in its parent
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

/* --------------- FORM FUNCTIONS --------------- */

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

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        
        if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } 
        else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } 
        else {
            this.value = "";
        }
      });
    });
  }