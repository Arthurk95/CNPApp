document.getElementById("newStudentSubmit").addEventListener("click", function() { httpPostAsync("newStudent");}, false);
document.getElementById("newActivitySubmit").addEventListener("click", function() { httpPostAsync("newActivity");}, false);
document.getElementById("addStu").addEventListener("click", function() { openStudent();}, false);
document.getElementById("addAct").addEventListener("click", function() { openActivity();}, false);
function httpPostAsync(type)
{
    var theUrl;
    var data="";
    var callback;
    if(type=="newStudent"){
        theUrl = window.location.href+'/addstudent';
        data = data + "name=" + document.getElementById("newStudentName").value;
        data = data + "&contact=" + document.getElementById("newStudentContact").value;
        data = data + "&email=" + document.getElementById("newStudentEmail").value;
        callback = uStuStatus;
    }
    if(type=="newActivity"){
        theUrl = window.location.href+'/addactivity';
        data = "name=" + document.getElementById("newActivityName").value;
        callback = uActStatus;
    }
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    {
        callback(xmlHttp.responseText);
    }
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    console.log(data);
    xmlHttp.send(data);
}
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
}
function openActivity(){
    document.getElementById("newActivity").style.visibility = "visible";
    document.getElementById("newStudent").style.visibility = "hidden";
}