function httpPostAsync(theUrl, data, callback)
{
    if(callback === null || callback === undefined){
        callback = doNothing;
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
    xmlHttp.send(data);
}

function httpPutAsync(theUrl, data, callback)
{
    if(callback === null || callback === undefined){
        callback = doNothing;
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("PUT", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.send(data);
}

function logit(datum){
    console.log(datum);
}

function reloadIt(datum){
    location.reload(true);
}

function doNothing(datum){}