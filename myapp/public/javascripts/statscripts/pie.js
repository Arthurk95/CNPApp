class thePie {

  color = null; 
  radius = null;
  svg = null;
  tooltip = null;
  myId = null;
  total = null;
  friendBool = null;

  constructor(id) {
    this.myId = id;

    // set the dimensions and margins of the graph
    this.width = 675;
    this.height = 675;
    this.margin = 95;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    this.radius = Math.min(this.width, this.height) / 2 - this.margin;
 
     // set the color scale
    this.color = d3.scaleOrdinal()
     .domain(["a", "b", "c", "d", "e", "f"])
     .range(d3.schemeSet3, d3.schemeCategory10) 

    // append the svg object to the div called 'pie'
    this.svg = d3.select("#" + id)
      .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
      .append("g")
        .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")

    //tooltip for label
    this.tooltip = d3.select("#" + id)
        .append("svg")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "5px")
  }

  update(data, total, friendBool) {
    this.total = total;
    this.friendBool = friendBool;

    var parentObject = this;
    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
      .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // Make sure that group order remains the same in the pie chart
    
    var data_ready = pie(d3.entries(data))

    var div = d3.select("body").append("div")
     .attr("class", "tooltip-pie")
     .style("opacity", 0);

    // map to data
    //path
    var u = this.svg.selectAll("path")
      .data(data_ready)

    //text
    var t = this.svg.selectAll("text")
      .data(data_ready)

    //arc
    var arcLabel = d3.arc()
        .innerRadius(0)
        //.outerRadius(this.radius)
        .outerRadius(this.radius - 10)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
      .enter()
      .append('path')
      .merge(u)
      //.transition()
      //.duration(1000)
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', function(d){ var colors = parentObject.color; return(colors(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1)
      
      //mouseover for each slice of the pie
      .on('mouseover', function(d) {
        d3.select(this).transition()
             .duration('250')
             .style("opacity", .40)
        div.transition()
             .duration(500)
             .style("opacity", 1);
        let percent = (Math.round((d.value / total) * 100)).toString() + '%';
        //if looking at friends
        if (friendBool == 1) {
          div.html("Times Together: " + d.value + "\n" + percent)
             .style("left", (d3.event.pageX + 20) + "px")
             .style("top", (d3.event.pageY + 20) + "px");}
        //looking at activities
        else {
          div.html(d.data.key + "\n\n Total: " + d.value + "\n" + percent)
            .style("left", (d3.event.pageX + 20) + "px")
            .style("top", (d3.event.pageY + 20) + "px");}
      })

      //mouseout for each slice of the pie
      .on("mouseout", function(d){
        d3.select(this).transition()
            .duration('250')
            .style("opacity", 1);
        //Make new div disappear
        div.transition()
             .duration('500')
             .style("opacity", 0);
      })

    //label 
    t 
      .enter()
      .append('text')
      .merge(t)
      .text(function(d) { 
        if (d.data.value > 0)
          return "" + d.data.key })
      //.attr("transform", function(d) { 
        //return "translate(" + arcLabel.centroid(d) + ")";  })
      .attr("transform", function(d) {  
          var c = arcLabel.centroid(d);
          //return "translate(" + c[0]*2 + "," + c[1]*2.1 + ")";
          c[0] *= 2.2;
          c[1] *= 2.2;
          return "translate(" + c + ")";
       })
      .style("text-anchor", "middle")
      .style("font-size", 16)
      .style("stroke-width", .8)
      .style("stroke", "white")
      .style("paint-order", "stroke fill")

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

    temp = document.createElement("select"); temp.id = "syear"+id; temp.class="lab"; temp.className="lab"; temp.onchange = function(){sgenDays(id); updateData(id);};
    newdiv.appendChild(temp);

    temp = document.createElement("select"); temp.id="smonth" + id; temp.class="pretty-classic"; temp.onchange = function(){sgenDays(id); updateData(id);};
    newdiv.appendChild(makeMonthS(temp));

    temp = document.createElement("select"); temp.id="sday" + id; temp.class="startD"; temp.className="startD"; temp.onchange = function(){updateData(id);};
    newdiv.appendChild(temp);

    temp = document.createElement("label"); temp.innerHTML = " End Date ";
    newdiv.appendChild(temp);

    temp = document.createElement("select"); temp.id="eyear" + id; temp.class="pretty-classic"; temp.onchange = function(){egenDays(id); updateData(id);};
    newdiv.appendChild(temp);

    temp = document.createElement("select"); temp.id="emonth" + id; temp.class="pretty-classic"; temp.onchange = function(){egenDays(id); updateData(id);};
    newdiv.appendChild(makeMonthS(temp));

    temp = document.createElement("select"); temp.id="eday" + id; temp.class="newLine"; temp.onchange = function(){updateData(id);};
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
    var opid1 = document.getElementById("optionid1" + id)[document.getElementById("optionid1" + id).selectedIndex].value;
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
    if(opid1 != "all"){
      temp2 = document.createElement("option");
      temp2.innerHTML = "Friends";
      temp.appendChild(temp2);
    }
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
    temp.onchange = function(){updateData(id);updateOp2(id);};
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