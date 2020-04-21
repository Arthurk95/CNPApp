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
  var newdiv = document.createElement("div");
  var bottom = document.getElementById("newchart");
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
 
  //Delete button
  temp = document.createElement("button");
  temp.id="button";
  temp.class="deleteB";
  temp.className="deleteB";
  temp.innerHTML = "X";
  temp.onclick = function(){ deleteChart(id); };
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

  
  function onUpdateop1(id){
    updateOpid1(id);
    updateOp2(id);
    
    makeDates(id);
    updateData(id);
  }
  function updateData(id){
    getRecordsPie('all', id);
  }
  function updateOp2(id){
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
    studentList.forEach((element)=>{
      temp2 = document.createElement("option");
      temp2.value = element.StudentId;
      temp2.innerHTML = element.StudentName;
      temp.appendChild(temp2);
    });
    newdiv.appendChild(temp);
  }
}