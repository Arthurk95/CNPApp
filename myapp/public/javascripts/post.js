function httpPostAsync(theUrl, data, callback)
{
    /*
    else if(type=="newActivity"){
        theUrl = window.location.href+'/addactivity';
        data = "name=" + document.getElementById("newActivityName").value;
        callback = uActStatus;
    }
    else if(type[0]=='d', type[1]=='e', type[2]=='l',type[6]=='A', type[7]=='c', type[8]=='t'){
        theUrl = window.location.href+'/delete';
        i = 14;
        var val = "";
        while(type[i] >='0' && type[i] <= '9'){
            val = val + type[i];
            i= i + 1;
        }
        data = "actNum=" + val;
        callback = reloadIt;
    }*/
    
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.send(data);
}
function logit(datum){
    console.log(datum);
}
function reloadIt(datum){
    location.reload(true);
}