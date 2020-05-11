var dropdownToggled = false;
var MOBILE_WIDTH = 1200;

var formElement;

function toggleBodyOverflow(){
    if(document.body.style.overflow != "hidden"){
        document.body.style.overflow = "hidden";
    }
    else{
        document.body.style.overflow = "visible";
    }
}

function hideElement(element){
    element.style.display = "none";
}

function toggleElementID(id){
    toggleElement(document.getElementById(id));
}

function toggleElement(element){
    if(isElementHidden(element)){
        showElement(element);
    }
    else {hideElement(element);}
}

function toggleStyle(element, style){
    if(element.classList.contains(style)){
        element.classList.remove(style);
    }
    else{element.classList.add(style);}
}

function showElement(element){ element.style.display = "";}
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

function weekdaySelected(element){
    if(element.classList.contains('half-day')){
        element.classList.remove('half-day');
        element.classList.add('full-day');
    }
    else if(element.classList.contains('full-day')){
        element.classList.remove('full-day');
    }
    else{element.classList.add('half-day');}
}

function selectedDayType(element){
    if(element.classList.contains('half-day')){return 2;}
    if(element.classList.contains('full-day')){return 1;}
    else {return 0;}
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
    if(dayType == 1){
      element.classList.add("stripedBackground")
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

    element.style.height = otherElement.offsetHeight + "px";
    if(isElementHidden(element)){
        hideElement(otherElement, "");
        showElement(element, "");
    }
    else{
        hideElement(element);
        showElement(otherElement);
    }

}

function animateOpenClose(button, elementId){
    var element = document.getElementById(elementId);
    var arrow = element.parentElement.getElementsByTagName('i')[0];

    if(element.style.display === "none"){
        if(arrow != null && arrow != undefined){
            if(arrow.classList.contains("fa-chevron-down")){
                arrow.classList = "fas fa-chevron-up";
            }
        }
        $(element).slideDown();
        button.classList.add("active");
    }
    else{
        if(arrow != null && arrow != undefined){
            if(arrow.classList.contains("fa-chevron-up")){
                arrow.classList = "fas fa-chevron-down";
            }
        }
        $(element).slideUp();
        button.classList.remove("active");
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

// toggles between two classes based on if given input element value is empty
function toggleClassIfInputNotEmpty(inputID, element, className, oldClassName){
    var input = document.getElementById(inputID);


    if(input.value.length > 0){ // input not empty
        if(!element.classList.contains(className)){ // not already toggled before
            element.classList.add(className);
            element.classList.remove(oldClassName);
        }
    }
    else{ // input empty
        if(element.classList.contains(className)){ // input was not empty before
            element.classList.remove(className);
            element.classList.add(oldClassName);
        }
    }
}

function fillTodaysRosterPopup(ID, allStudents, todaysStudents){
    var elementToFill = document.getElementById(ID);
    for(var i = 0; i < allStudents.length; i++){
        // is allStudents[i].StudentID in todaysStudents
        // if not, add it to the popup
        if(todaysStudents.some(student => student.StudentId === allStudents[i].StudentId)){}
        else{
            var button = document.createElement('button');
            button.innerHTML = "<i class='light-text font25px fas fa-plus'></i>";
            button.classList = "theme-color2-light-BG";
            button.setAttribute("onclick", "addToTodaysRoster(this, " + JSON.stringify(allStudents[i]) + ");");
            var li = document.createElement('li');
            li.classList = "spaceBetween light-content-BG";
            var p = document.createElement('p');
            p.innerHTML = allStudents[i].StudentName;

            li.appendChild(p); li.appendChild(button);
            elementToFill.appendChild(li);
        }
    }
}

/* POPUP FUNCTIONS */

// opens a popup from the right of the passed element
function openPopup(element, popupID){
    var popup = document.getElementById(popupID);
    var rect = element.getBoundingClientRect();

    
    

    toggleElement(popup);

    if((rect.right + popup.offsetWidth) > document.body.clientWidth){
        popup.style.left = (rect.right - popup.offsetWidth - 10) + "px";
    }
    else{popup.style.left = (rect.right + 10) + "px";}
    
    
    popup.style.top = (rect.top - 10) + "px";

    window.onresize = function(){
        var popup = document.getElementById(popupID);
        var rect = element.getBoundingClientRect();
        if((rect.right + popup.offsetWidth) > document.body.clientWidth){ // outside of bounds of page
            popup.style.left = (rect.right - popup.offsetWidth - 10) + "px";
        }
        else{popup.style.left = (rect.right + 10) + "px";}
        popup.style.top = (rect.top - 10) + "px";
        
        
    }
    
}

function closePopup(popupID){
    document.getElementById(popupID).style.display = "none";
}

function hideAllPopups(){
    var popups = document.getElementsByClassName('popup');
    for(var i = 0; i < popups.length; i++){
        hideElement(popups[i]);
    }
}

/* --------------- FORM FUNCTIONS --------------- */

function closeForm(){
    formElement.style.display = "none";
  }

function openForm(formID){
    hideAllPopups();
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


var twoColDivClasses = "flex spaceBetween marginBottom10 width100";
function twoColDiv(left, right){
    var div = document.createElement('div');
    div.classList = twoColDivClasses;

    div.appendChild(left);
    div.appendChild(right);
    return div;
}