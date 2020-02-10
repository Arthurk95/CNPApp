document.getElementById("newStudentSubmit").addEventListener("click", function() { httpPostAsync("newStudent");}, false);
document.getElementById("newActivitySubmit").addEventListener("click", function() { httpPostAsync("newActivity");}, false);
document.getElementById("addStu").addEventListener("click", function() { openStudent();}, false);
document.getElementById("addAct").addEventListener("click", function() { openActivity();}, false);

function uStuStatus(datum)
{
    document.getElementById("stuStatus").innerText = datum;
    document.getElementById("stuStatus").style.visibility = "visible";
}
function uActStatus(datum)
{
    document.getElementById("actStatus").innerText = datum;
    document.getElementById("actStatus").style.visibility = "visible";
}
function openStudent(){
    document.getElementById("newStudent").style.visibility = "visible";
    document.getElementById("newActivity").style.visibility = "hidden";
    document.getElementById("actStatus").style.visibility = "hidden";
    document.getElementById("stuStatus").style.visibility = "hidden";
}
function openActivity(){
    document.getElementById("newActivity").style.visibility = "visible";
    document.getElementById("newStudent").style.visibility = "hidden";
    document.getElementById("actStatus").style.visibility = "hidden";
    document.getElementById("stuStatus").style.visibility = "hidden";
}