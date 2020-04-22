class thePie {

  color = null; 
  radius = null;
  svg = null;
  myId = null;

  constructor(id) {
    this.myId = id;

    // set the dimensions and margins of the graph
    this.width = 450;
    this.height = 450;
    this.margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    this.radius = Math.min(this.width, this.height) / 2 - this.margin;
 
     // set the color scale
    this.color = d3.scaleOrdinal()
     .domain(["a", "b", "c", "d", "e", "f"])
     .range(d3.schemeDark2);

    // append the svg object to the div called 'pie'
    this.svg = d3.select("#" + id)
      .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
      .append("g")
        .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")
  }

  update(data) {
    var parentObject = this;
    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
      .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
    var data_ready = pie(d3.entries(data))

    // map to data
    var u = this.svg.selectAll("path")
      .data(data_ready)

    var t = this.svg.selectAll("text")
      .data(data_ready)

    var arcLabel = d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
      .enter()
      .append('path')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', function(d){ var colors = parentObject.color; return(colors(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1)

    //label  
    t 
      .enter()
      .append('text')
      .merge(t)
      .transition()
      .duration(1000)
      .text(function(d){ 
        if (d.data.value > 0)
          //return " " + d.data.key + "\n" + d.value})
          return "" + d.data.key })
      .attr("transform", function(d) { 
        return "translate(" + arcLabel.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 20)

    // remove the group that is not present anymore
    u
      .exit()
      .remove()

    t 
      .exit()
      .remove()
      
  };
};

function generatePie(id){
  var parent = document.getElementById("charts");
  var newdiv = document.createElement("div"); newdiv.id = id;
  var bottom = document.getElementById("newchart");
  
  var temp;

  //Start and End Date
  {
    temp = document.createElement("label"); temp.innerHTML = "Beginning Date ";
    newdiv.appendChild(temp);

    temp = document.createElement("select");temp.id = "syear"+id; temp.class="lab"; temp.className="lab"; temp.onchange = function(){sgenDays(id); updateData(id);};
    newdiv.appendChild(temp);

    temp = document.createElement("select");temp.id="smonth" + id; temp.class="pretty-classic"; temp.onchange = function(){sgenDays(id); updateData(id);};
    newdiv.appendChild(makeMonthS(temp));

    temp = document.createElement("select");temp.id="sday" + id; temp.class="pretty-classic"; temp.onchange = function(){updateData(id);};
    newdiv.appendChild(temp);

    temp = document.createElement("label");temp.innerHTML = " End Date ";
    newdiv.appendChild(temp);

    temp = document.createElement("select");temp.id="eyear" + id; temp.class="pretty-classic"; temp.onchange = function(){egenDays(id); updateData(id);};
    newdiv.appendChild(temp);

    temp = document.createElement("select");temp.id="emonth" + id; temp.class="pretty-classic"; temp.onchange = function(){egenDays(id); updateData(id);};
    newdiv.appendChild(makeMonthS(temp));

    temp = document.createElement("select");temp.id="eday" + id; temp.class="newLine"; temp.onchange = function(){updateData(id);};
    newdiv.appendChild(temp);

  }
 
  //Delete button
  temp = document.createElement("button"); temp.id="button"; temp.class="deleteButton"; temp.className="deleteButton"; temp.onclick = function(){deleteChart(id);}; temp.innerHTML = "X";
  newdiv.appendChild(temp);

  //Drop Down Options
  temp = document.createElement("div");
  temp.id = "opid1" + id;
  newdiv.appendChild(temp);
  temp = document.createElement("div");
  temp.id = "op2" + id;
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
    getRecordsPie('all', id);
  }

  function updateOp2(id) {
    var newdiv = document.getElementById("op2" + id);
    var temp,temp2;
    if(newdiv.hasChildNodes()){
      document.getElementById("option2" + id).remove();
    }
    temp = document.createElement("select");
    temp.id="option2" + id;
    temp.class="pretty-classic";
    temp.onchange = function(){updateData(id);};
    temp2 = document.createElement("option");
    temp2.innerHTML = "Activities";
    temp.appendChild(temp2);
    temp2 = document.createElement("option");
    temp2.innerHTML = "Friends";
    temp.appendChild(temp2);
    newdiv.appendChild(temp);
  }

  function updateOpid1(id){
    var newdiv = document.getElementById("opid1" + id);
    var temp,temp2;
    if(newdiv.hasChildNodes()){
      document.getElementById("optionid1" + id).remove();
    }
    temp = document.createElement("select");
    temp.id="optionid1" + id;
    temp.class="pretty-classic";
    temp.onchange = function(){updateData(id);};
    temp2 = document.createElement("option");
    temp2.value = "all";
    temp2.innerHTML = "All Students";
    temp.appendChild(temp2);
    studentList.forEach((element)=>{
      temp2 = document.createElement("option");
      temp2.value = element.StudentId;
      temp2.innerHTML = element.StudentName;
      temp.appendChild(temp2);
    });
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