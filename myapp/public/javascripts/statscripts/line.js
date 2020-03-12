class theLine{
  margin = null;
  width = null;
  height = null;
  line = null;
  myColor = null;
  x = null;
  y = null;
  datum = [];
  constructor(){
    this.margin = {top: 10, right: 100, bottom: 30, left: 30};
    this.width = 460 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }
  plotLine(){
    var parentObj = this;
    // set the dimensions and margins of the graph
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");

    //Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv", function(data) {
    parentObj.datum.push(data);
      // List of groups (here I have one group per column)
      var allGroup = ["valueA", "valueB", "valueC"]

      // add the options to the button
      d3.select("#selectButton")
        .selectAll('myOptions')
          .data(allGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

      // A color scale: one color for each group
      parentObj.myColor = d3.scaleOrdinal()
        .domain(allGroup)
        .range(d3.schemeSet2);

      // Add X axis --> it is a date format
      parentObj.x = d3.scaleLinear()
        .domain([0,10])
        .range([ 0, parentObj.width ]);
      svg.append("g")
        .attr("transform", "translate(0," + parentObj.height + ")")
        .call(d3.axisBottom(parentObj.x));

      // Add Y axis
      parentObj.y = d3.scaleLinear()
        .domain( [0,20])
        .range([ parentObj.height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(parentObj.y));

      // Initialize line with group a
      parentObj.line = svg
        .append('g')
        .append("path")
          .datum(data)
          .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.valueA) })
          )
          .attr("stroke", function(d){ return parentObj.myColor("valueA") })
          .style("stroke-width", 4)
          .style("fill", "none")

      function update(selectedGroup) {
        // Create new data with the selection?
        var dataFilter = parentObj.datum.map(function(d){return {time: d.time, value:d[selectedGroup]} })
    
        // Give these new data to update line
        line
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(+d.time) })
              .y(function(d) { return y(+d.value) })
            )
            .attr("stroke", function(d){ return myColor(selectedGroup) })
      }

      // When the button is changed, run the updateChart function
      d3.select("#selectButton").on("change", function(d) {
          // recover the option that has been chosen
          var selectedOption = d3.select(this).property("value")
          // run the updateChart function with this selected option
          update(selectedOption)
      });
      
    });
  }
};