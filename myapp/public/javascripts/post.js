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
    if(type[0]=='d', type[1]=='e', type[2]=='l',type[6]=='A', type[7]=='c', type[8]=='t'){
        theUrl = window.location.href+'/delete';
        i = 14;
        var val = "";
        while(type[i] >='0' && type[i] <= '9'){
            val = val + type[i];
            i= i + 1;
        }
        data = "actNum=" + val;
        callback = logit;
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
function logit(datum){
    console.log(datum);
}