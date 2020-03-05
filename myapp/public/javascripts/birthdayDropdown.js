var clickedLi;
var selectedLiHeight;

$('#birthdayDropdown').on('click', 'li', function(){
    clickedLi = $(this).context; // returns the <li> element that was selected
    selectedLiHeight = clickedLi.offsetHeight;
    valueSelected();
});

function valueSelected(){
    // selectedValue clicked again: open/close dropdown
    if(clickedLi.classList.contains('selectedValue')){ 
        toggleDropdown(clickedLi.parentElement);
    }
    else{
        changeSelectedValue(clickedLi.parentElement);
    }
}

function toggleDropdown(dropdown){
    var options = dropdown.getElementsByTagName("li");
    var displayType = "block";
    if(options[1].style.display == "block"){
        displayType = "none";
    }
    for(var i = 1; i < options.length; i++){
        options[i].style.display = displayType;
        if(displayType == "block"){
            options[i].style.top = (selectedLiHeight*i)+'px';
        }
        else{options[i].style.top = 0;}
    }
}

function changeSelectedValue(dropdown){
    var toReplace = dropdown.getElementsByClassName("selectedValue")[0];

    toReplace.innerHTML = clickedLi.innerHTML;
    if(dropdown.id != "day")
        genDays();
    toggleDropdown(dropdown);
}

function getValues(){
    var selectedValues = $('#birthdayDropdown').getElementsByClassName('selectedValue');

    var date = {
        "year": selectedValues[0].innerHTML,
        "month": selectedValues[1].innerHTML,
        "day": selectedValues[2].innerHTML
    }
}