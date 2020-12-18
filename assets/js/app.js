
function makeResponsive(){
// create chart
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// wrapper
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
  
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);


//load csv file 
d3.csv("./assets/data/data.csv").then(function(mydata) {

    console.log(mydata);

    mydata.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
    });

    var age_min;
    var age_max;
    var smoke_min;
    var smoke_max;
    
    age_min = d3.min(mydata, function(data) {
        return data.age;
    });
    
    age_max = d3.max(mydata, function(data) {
        return data.age;
    });
    
    smoke_min = d3.min(mydata, function(data) {
        return data.smokes;
    });
    
    smoke_max = d3.max(mydata, function(data) {
        return data.smokes;
    });
  




    //create x scale with age
    var xscale = d3.scaleLinear()
    .domain([age_min, age_max])
    .range([0, width]);
    console.log(xscale)

    
    //create y scale
    var yscale = d3.scaleLinear()
    .domain([smoke_min, smoke_max])
    .range([height, 0]);



    //define axis
    var bottomAxis = d3.axisBottom(xscale);
    var leftAxis = d3.axisLeft(yscale);
    // add x-axis
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
    // Add y-axis
    chartGroup.append("g").call(leftAxis);
    
    chartGroup.append("text")
    .style("font-size", "12px")
    .selectAll("tspan")
    .data(mydata)
    .enter()
    .append("tspan")
    .attr("x", function(data) {
        return xscale(data.age - 0.13);
    })
    .attr("y", function(data) {
        return yscale(data.smokes - 0.2);
    })
    .text(function(data) {
        return data.abbr
    });

  // append circles to data points
    var circlesgroup = chartGroup.selectAll("circle")
    .data(mydata)
    .enter()
    .append("circle")
    .attr("cx", d => xscale(d.age))
    .attr("cy", d => yscale(d.smokes ))
    .attr("r", "13")
    .attr("opacity", .5)
    .attr("fill", ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]);
    
    var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");

  // Step 2: Add an onmouseover event to display a tooltip
  // ========================================================
  circlesgroup.on("mouseover", function(d, i) {
    toolTip.style("display", "block");
    toolTip.html(`Smokes: <strong>${data.smokes[i]}</strong>`)
      .style("left", d3.event.pageX + 10+"px")
      .style("top", d3.event.pageY + 10+"px");
  })
    // Step 3: Add an onmouseout event to make the tooltip invisible
    .on("mouseout", function() {
      toolTip.style("display", "none");
    });




 
  
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokes(%)");

      chartGroup.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Age");
  

});
}
// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);
