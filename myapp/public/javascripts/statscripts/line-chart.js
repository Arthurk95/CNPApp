function theLine(id, data) {
  myId = id;
  
  return new Chart(document.getElementById("canvas" + id), {
    type: 'line',
    data: {
      labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
      datasets: [{ 
          data: [data[0].value,data[0].value,data[0].value,data[0].value,data[0].value,data[0].value,data[0].value,data[0].value,data[0].value,data[0].value],
          label: data[0].activityName,
          borderColor: getRandomColor(),
          fill: false
        }, { 
          data: [data[1].value,data[1].value,data[1].value,data[1].value,data[1].value,data[1].value,data[1].value,data[1].value,data[1].value,data[1].value],
          label: data[1].activityName,
          borderColor: getRandomColor(),
          fill: false
        }, { 
          data: [data[2].value,data[2].value,data[2].value,data[2].value,data[2].value,data[2].value,data[2].value,data[2].value,data[2].value,data[2].value],
          label: data[2].activityName,
          borderColor: getRandomColor(),
          fill: false
        }, { 
          data: [data[3].value,data[3].value,data[3].value,data[3].value,data[3].value,data[3].value,data[3].value,data[3].value,data[3].value,data[3].value],
          label: data[3].activityName,
          borderColor: getRandomColor(),
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
  });
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateLine(id) {
  var parent = document.getElementById("charts");
  var newdiv = document.createElement("div");
  var bottom = document.getElementById("newchart");
  var canvas = document.createElement("canvas");
  canvas.id = "canvas" + id;
  newdiv.id = id;
  var temp,temp2;
  {
    temp = document.createElement("label");
    temp.innerHTML = "Beginning Date";
    newdiv.appendChild(temp);
    temp = document.createElement("select");
    temp.id = "syear"+id;
    temp.class="pretty-classic";
    temp.onchange = function(){sgenDays(id); updateData(id);};
    newdiv.appendChild(temp);
    temp = document.createElement("select");
    temp.id="smonth" + id;
    temp.class="pretty-classic";
    temp.onchange = function(){sgenDays(id); updateData(id);};
    {
      temp2 = document.createElement("option");
      temp2.value = "01";
      temp2.innerHTML = "Jan";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "02";
      temp2.innerHTML = "Feb";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "03";
      temp2.innerHTML = "Mar";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "04";
      temp2.innerHTML = "Apr";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "05";
      temp2.innerHTML = "May";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "06";
      temp2.innerHTML = "Jun";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "07";
      temp2.innerHTML = "Jul";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "08";
      temp2.innerHTML = "Aug";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "09";
      temp2.innerHTML = "Sep";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "10";
      temp2.innerHTML = "Oct";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "11";
      temp2.innerHTML = "Nov";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "12";
      temp2.innerHTML = "Dec";
      temp.appendChild(temp2);
    }
    newdiv.appendChild(temp);
    temp = document.createElement("select");
    temp.id="sday" + id;
    temp.class="pretty-classic";
    temp.onchange = function(){updateData(id);};
    newdiv.appendChild(temp);
    temp = document.createElement("label");
    temp.innerHTML = "End Date";
    newdiv.appendChild(temp);
    temp = document.createElement("select");
    temp.id="eyear" + id;
    temp.class="pretty-classic";
    temp.onchange = function(){egenDays(id); updateData(id);};
    newdiv.appendChild(temp);
    temp = document.createElement("select");
    temp.id="emonth" + id;
    temp.class="pretty-classic";
    temp.onchange = function(){egenDays(id); updateData(id);};
    {
      temp2 = document.createElement("option");
      temp2.value = "01";
      temp2.innerHTML = "Jan";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "02";
      temp2.innerHTML = "Feb";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "03";
      temp2.innerHTML = "Mar";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "04";
      temp2.innerHTML = "Apr";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "05";
      temp2.innerHTML = "May";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "06";
      temp2.innerHTML = "Jun";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "07";
      temp2.innerHTML = "Jul";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "08";
      temp2.innerHTML = "Aug";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "09";
      temp2.innerHTML = "Sep";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "10";
      temp2.innerHTML = "Oct";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "11";
      temp2.innerHTML = "Nov";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "12";
      temp2.innerHTML = "Dec";
      temp.appendChild(temp2);
    }
    newdiv.appendChild(temp);
    temp = document.createElement("select");
    temp.id="eday" + id;
    temp.class="pretty-classic";
    temp.onchange = function(){updateData(id);};
    newdiv.appendChild(temp);
  }
  temp = document.createElement("select");
  temp.id="option1" + id;
  temp.class="pretty-classic";
  temp.onchange = function(){onUpdateop1(id);};
  {
    temp2 = document.createElement("option");
    temp2.value = "01";
    temp2.innerHTML = "Students";
    temp.appendChild(temp2);
    temp2 = document.createElement("option");
    temp2.value = "02";
    temp2.innerHTML = "Activities";
    temp.appendChild(temp2);
  }
  newdiv.appendChild(temp);
  temp = document.createElement("div");
  temp.id = "opid1" + id;
  newdiv.appendChild(temp);
  temp = document.createElement("div");
  temp.id = "op2" + id;
  newdiv.appendChild(temp);
  newdiv.appendChild(canvas);
  parent.insertBefore(newdiv,bottom);
  onUpdateop1(id);

  function onUpdateop1(id) {
    updateOpid1(id);
    updateOp2(id);
    makeDates(id);
    updateData(id);
  }

  function updateData(id) {
    getRecordsLine('all', id);
  }

  function updateOp2(id) {
    var op1 = document.getElementById("option1" + id);
    var newdiv = document.getElementById("op2" + id);
    var temp,temp2;
    if(newdiv.hasChildNodes()) {
      document.getElementById("option2" + id).remove();
    }
    temp = document.createElement("select");
    temp.id="option2" + id;
    temp.class="pretty-classic";
    temp.onchange = function(){updateData(id);};
    if(op1.value == "01")
    {
      temp2 = document.createElement("option");
      temp2.value = "01";
      temp2.innerHTML = "Activities";
      temp.appendChild(temp2);
      temp2 = document.createElement("option");
      temp2.value = "02";
      temp2.innerHTML = "Behaivior";
      temp.appendChild(temp2);
    }
    newdiv.appendChild(temp);
  }
  
  function updateOpid1(id) {
    var op1 = document.getElementById("option1" + id);
    var newdiv = document.getElementById("opid1" + id);
    var temp,temp2;
    if(newdiv.hasChildNodes()){
      document.getElementById("optionid1" + id).remove();
    }
    temp = document.createElement("select");
    temp.id="optionid1" + id;
    temp.class="pretty-classic";
    temp.onchange = function(){updateData(id);};
    if(op1.value == "01")
    {
      studentList.forEach((element)=>{
        temp2 = document.createElement("option");
        temp2.value = element.StudentId;
        temp2.innerHTML = element.StudentName;
        temp.appendChild(temp2);
      });
    }
    newdiv.appendChild(temp);
  }
}
