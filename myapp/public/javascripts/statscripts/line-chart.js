function theLine(id, data) {

  var labels;
  var dataSets = [];
  var colors = getRandomColors(data.length - 1);
  var i = 0;
  var title = "Student Records";

  data.forEach((element) => {
    if(element.labelName == null) {
      labels = element.labels
    }
    else {
      dataSets.push({
        data: element.values,
        label: element.labelName, 
        borderColor: colors[i++],
        fill: false 
      })
    }
  });
  
  var chart = new Chart(document.getElementById("canvas" + id), {
    type: 'line',
    data: {
      labels: labels,
      datasets: dataSets
    },
    options: {
      title: {
        display: true,
        text: title
      }
    }
  });
  chart.myId = id;
  chart.className = "canvasObj";
  return chart;
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
  var newdiv = document.createElement("div");newdiv.id = id;
  var bottom = document.getElementById("newchart");
  
  var temp,temp2;

  //Start and End Date
  {
    temp = document.createElement("label"); temp.innerHTML = "Beginning Date ";
    newdiv.appendChild(temp);

    temp = document.createElement("select");temp.id = "syear"+id; temp.class="lab"; temp.className="lab"; temp.onchange = function(){sgenDays(id); updateData(id);};
    newdiv.appendChild(temp);

    temp = document.createElement("select");temp.id="smonth" + id; temp.class="pretty-classic"; temp.onchange = function(){sgenDays(id); updateData(id);};
    newdiv.appendChild(makeMonthS(temp));

    temp = document.createElement("select");temp.id="sday" + id; temp.class="startD"; temp.className="startD"; temp.onchange = function(){updateData(id);};
    newdiv.appendChild(temp);

    temp = document.createElement("label");temp.innerHTML = " End Date ";
    newdiv.appendChild(temp);

    temp = document.createElement("select");temp.id="eyear" + id;temp.class="pretty-classic";temp.onchange = function(){egenDays(id); updateData(id);};
    newdiv.appendChild(temp);

    temp = document.createElement("select");temp.id="emonth" + id;temp.class="pretty-classic";temp.onchange = function(){egenDays(id); updateData(id);};
    newdiv.appendChild(makeMonthS(temp));

    temp = document.createElement("select");temp.id="eday" + id;temp.class="pretty-classic";temp.onchange = function(){updateData(id);};
    newdiv.appendChild(temp);

  }

  //The Spin thing
  temp = document.createElement("input");temp.id="section" + id; temp.class="spinny"; temp.className = "spinny"; temp.type = "NUMBER";temp.min = "2";temp.max = "100";temp.step = "1";temp.value= "10";temp.onchange = function(){updateData(id);};
  newdiv.appendChild(temp);

  //Delete button
  temp = document.createElement("button");temp.id="button";temp.class="deleteB";temp.className="deleteB";temp.onclick = function(){deleteChart(id);};temp.innerHTML = "X";
  newdiv.appendChild(temp);

  //First Drop Down Option
  temp = document.createElement("select");temp.id="option1" + id;temp.class="newLine";temp.className="newLine";temp.onchange = function(){onUpdateop1(id);};
  {
    temp2 = document.createElement("option");temp2.value = "01";temp2.innerHTML = "Students";
    temp.appendChild(temp2);

    temp2 = document.createElement("option");temp2.value = "02";temp2.innerHTML = "Activities";
    temp.appendChild(temp2);
  }
  newdiv.appendChild(temp);

  //Second Drop Down (I think)
  temp = document.createElement("div");temp.id = "opid1" + id;
  newdiv.appendChild(temp);

  temp = document.createElement("div");temp.id = "op2" + id;temp.class="secondOption";temp.className = "secondOption";
  newdiv.appendChild(temp);

  temp = document.createElement("canvas");temp.id = "canvas" + id;temp.className = "canvasObj";
  newdiv.appendChild(temp);

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

  //Update the Second Option
  function updateOp2(id) {
    var op1 = document.getElementById("option1" + id);
    var opid1 = document.getElementById("optionid1" + id);
    var newdiv = document.getElementById("op2" + id);
    var temp,temp2;

    if(newdiv.hasChildNodes()) {
      document.getElementById("option2" + id).remove();
    }

    temp = document.createElement("select");temp.id="option2" + id;temp.class="pretty-classic";temp.onchange = function(){updateData(id);};
    if(op1.value == "01" && opid1.value != "all")
    {
      temp2 = document.createElement("option");temp2.value = "01";temp2.innerHTML = "Activities";
      temp.appendChild(temp2);

      temp2 = document.createElement("option");temp2.value = "02";temp2.innerHTML = "Friends";
      temp.appendChild(temp2);
    }
    else if(op1.value == "01" && opid1.value == "all"){
      temp2 = document.createElement("option");temp2.value = "01";temp2.innerHTML = "Potty total";
      temp.appendChild(temp2);

      temp2 = document.createElement("option");temp2.value = "02";temp2.innerHTML = "Potty successes";
      temp.appendChild(temp2);

      temp2 = document.createElement("option");temp2.value = "03";temp2.innerHTML = "Potty accidents";
      temp.appendChild(temp2);

      temp2 = document.createElement("option");temp2.value = "04";temp2.innerHTML = "Absences";
      temp.appendChild(temp2);
    }
    else if(op1.value == "02"){
      temp2 = document.createElement("option");temp2.value = "01";temp2.innerHTML = "Students";
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
    temp = document.createElement("select");temp.id="optionid1" + id;temp.class="pretty-classic";temp.onchange = function(){updateOp2(id);updateData(id);};
    if(op1.value == "01")
    {
      temp2 = document.createElement("option");temp2.value = "all";temp2.innerHTML = "All Students";
      temp.appendChild(temp2);

      studentList.forEach((element)=>{
        temp2 = document.createElement("option");temp2.value = element.StudentId;temp2.innerHTML = element.StudentName;
        temp.appendChild(temp2);
      });
    }
    else if(op1.value =="02"){
      activityList.forEach((element)=>{
        temp2 = document.createElement("option");temp2.value = element.ActivityId;temp2.innerHTML = element.ActivityName;
        temp.appendChild(temp2);
      });
    }
    newdiv.appendChild(temp);
  }

  function makeMonth(val, html){
    var temp2 = document.createElement("option");
    temp2.value = val;
    temp2.innerHTML = html;
    return temp2;
  }

  //Months
  function makeMonthS(addToMe){
    var temp = addToMe;
    temp.appendChild(makeMonth("01","Jan"));
    temp.appendChild(makeMonth("02","Feb"));
    temp.appendChild(makeMonth("03","Mar"));
    temp.appendChild(makeMonth("04","Apr"));
    temp.appendChild(makeMonth("05","May"));
    temp.appendChild(makeMonth("06","Jun"));
    temp.appendChild(makeMonth("07","Jul"));
    temp.appendChild(makeMonth("08","Aug"));
    temp.appendChild(makeMonth("09","Sep"));
    temp.appendChild(makeMonth("10","Oct"));
    temp.appendChild(makeMonth("11","Nov"));
    temp.appendChild(makeMonth("12","Dec"));
    return temp;
  }
}
