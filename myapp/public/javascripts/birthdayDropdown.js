const MAX_DROPDOWN_HEIGHT = 100;
var birthday = new Date();
var date = new Date();
var yearDrop;

$(document).ready(function(){
    
    yearDrop = document.getElementById('year');
    // for if a birthday dropdown exist
    if(document.getElementById('studentbirthday') != null){
        birthday = new Date(document.getElementById('studentbirthday').value);
    }
    for(var i = 0; i < 15; ++i){
        var option = document.createElement("option");
        option.text = date.getFullYear() - i;
        if(option.text == birthday.getFullYear()){
            option.selected = true;
        }
        yearDrop.appendChild(option);
    }
    
    var month = document.getElementById('month');
    month.selectedIndex = birthday.getMonth();
    genDays();
});

function genDays(){
    var months = document.getElementById('month');
    var month = months.options[months.selectedIndex].value;
    var years = document.getElementById('year');
    var year = years.options[years.selectedIndex].text;
    var day = document.getElementById('day');
    month = new Date(Date.parse(month +" 1, 2012")).getMonth()+1
    var daysinmonth = new Date(year, month, 0).getDate();
    $(day).empty();
    for(var i = 0; i <= daysinmonth; ++i){
        var option = document.createElement("option");
        option.text = i;
        option.value = i;
        if(option.text == (birthday.getDate())){
            option.selected = true;
        }
        day.appendChild(option);
    }
    
    $dropdown.refresh();
}