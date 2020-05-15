class thePie {
  constructor(id) {
    this.myId = id;

    this.color = null; 
    this.radius = null;
    this.svg = null;
    this.tooltip = null;
    this.total = null;
    this.friendBool = null;
    
    // set the dimensions and margins of the graph
    this.width = 600;
    this.height = 600;
    this.margin = 85;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    this.radius = Math.min(this.width, this.height) / 2 - this.margin;
 
     // set the color scale
    this.color = d3.scaleOrdinal()
     .domain(["a", "b", "c", "d", "e", "f"])
     .range(d3.schemeSet3, d3.schemeCategory10) 

    // append the svg object to the div called 'pie'
    
    this.svg = d3.select("#" + id + "right")
      .classed("svg", true)
      .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 625 625")
        .attr("width", this.width)
        .attr("height", this.height)
      .append("g")
        .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")
    //tooltip for label
    this.tooltip = d3.select("#" + id + "right")
        .append("tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "5px")
  }
  
  
  // update the data
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
        .outerRadius(this.radius - 10)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
      .enter()
      .append('path')
      .merge(u)
      //Transition will break the code
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
          {
            let percent = (Math.round((d.value / total) * 100));
            if (percent > 4) {
              return "" + d.data.key }
          }
      })

      .attr("transform", function(d) {  
          var c = arcLabel.centroid(d);
          c[0] *= 2.2;
          c[1] *= 2.2;
          return "translate(" + c + ")";
       })

      .style("text-anchor", "middle")
      .style("font-size", 15)
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

// generate a pie
function generatePie(id){
  var parent = document.getElementById("charts");
  var container = document.createElement("div"); container.id = id; container.className = "light-content-BG width100 margin10 center flexGrow1 borderRadiusSmall minWidth400px width100Mobile";
  var bottom = document.getElementById("chartPanel");
  bottom.className = "width100 dark-content-BG flex centerFlexMobile width90Mobile center";

  var twoColContainer = document.createElement("div");
  twoColContainer.classList = "flex flexCollapseMobile spaceBetween heavyPadding";
  
  var pieRow = document.createElement('div'); pieRow.id = id + "right";
  pieRow.classList = "flexGrow1 flex flexColumn";

  var optionsRow = document.createElement('div');
  optionsRow.classList = "width20 center width100Mobile flex flexColumn flexAlignCenter marginBelowChildren10";

  var temp;

  //Start and End Date
  { 
    temp = document.createElement("title"); temp.className = "width100 dark-content-light-BG flex spaceBetween flexAlignCenter marginLeft light-text font25px";

    var title = document.createElement('h2'); title.innerHTML = "Pie Chart"; title.classList = "light-text heavyPadding";

    temp.appendChild(title);
    var del = document.createElement("a"); del.id = "button"; del.className="marginRight10 padding10px light-text theme-color4-BG hoverable font25px"; del.onclick = function(){deleteChart(id);}; del.innerHTML = "X";
    temp.appendChild(del);
    container.appendChild(temp);

    // Beginning date select
    temp = document.createElement("label"); temp.innerHTML = "Beginning Date "; temp.className = "label width90 center marginBottom10";
    optionsRow.appendChild(temp);

    var selectDiv = document.createElement('div'); selectDiv.classList = "select-column";
    temp = document.createElement("select"); temp.id = "syear" + id; temp.className = "width100 arrow-down"; temp.onchange = function(){sgenDays(id); updateData(id);};
    selectDiv.appendChild(temp);

    temp = document.createElement("select"); temp.id = "smonth" + id; temp.className = "width100 arrow-down"; temp.onchange = function(){sgenDays(id); updateData(id);};
    selectDiv.appendChild(makeMonthS(temp));

    temp = document.createElement("select"); temp.id = "sday" + id; temp.className = "width100 arrow-down"; temp.onchange = function(){sgenDays(id); updateData(id);};
    // temp = document.createElement("select"); temp.id = "sday" + id; temp.className = "width30 arrow-down"; temp.onchange = function(){updateData(id);};
    selectDiv.appendChild(temp);

    optionsRow.appendChild(selectDiv);


    // end date select
    temp = document.createElement("label"); temp.innerHTML = "End Date"; temp.className = "label width90 center marginBottom10";
    optionsRow.appendChild(temp);

    selectDiv = document.createElement('div'); selectDiv.classList = "select-column";
    temp = document.createElement("select"); temp.id = "eyear" + id; temp.className="width100 arrow-down"; temp.onchange = function(){egenDays(id); updateData(id);};
    selectDiv.appendChild(temp);

    temp = document.createElement("select"); temp.id = "emonth" + id; temp.className="width100 arrow-down"; temp.onchange = function(){egenDays(id); updateData(id);};
    selectDiv.appendChild(makeMonthS(temp));

    temp = document.createElement("select"); temp.id = "eday" + id; temp.className="width100 arrow-down"; temp.onchange = function(){updateData(id);};
    selectDiv.appendChild(temp);
    
    optionsRow.appendChild(selectDiv);
  }

  //Drop Down Options
  twoColDiv = document.createElement("div"); twoColDiv.classList = "width100 flex flexWrap spaceBetween flexAlignCenter";
  temp = document.createElement("div");
  temp.id = "opid1" + id;
  twoColDiv.appendChild(temp);
  temp = document.createElement("div");
  temp.id = "op2" + id;
  twoColDiv.appendChild(temp);
  
  optionsRow.appendChild(twoColDiv);

  twoColContainer.appendChild(optionsRow);
  twoColContainer.appendChild(pieRow);

  container.appendChild(twoColContainer);

  parent.appendChild(container);
  onUpdateop1(id);

  
  function onUpdateop1(id) {
    updateOpid1(id);
    updateOp2(id);
    
    makeDates(id);
    updateData(id);
  }

  //update data
  function updateData(id) {
    getRecordsPie('all', id);
  }

  //update the second option 
  function updateOp2(id) {
    var newdiv = document.getElementById("op2" + id);
    var opid1 = document.getElementById("optionid1" + id)[document.getElementById("optionid1" + id).selectedIndex].value;
    var temp,temp2;
    if(newdiv.hasChildNodes()){
      document.getElementById("option2" + id).remove();
    }
    temp = document.createElement("select");
    temp.id="option2" + id;
    temp.className="arrow-down";
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

  //update the first option
  function updateOpid1(id){
    var newdiv = document.getElementById("opid1" + id);
    var temp,temp2;

    if(newdiv.hasChildNodes()){
      document.getElementById("optionid1" + id).remove();
    }
    temp = document.createElement("select");
    temp.id="optionid1" + id;
    temp.className="arrow-down";
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
  
  //make the months
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