

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
  
    // log a list of age
    var smoker_age = mydata.map(data => data.age);
    console.log("age",smoker_age );
    var smoke_high = mydata.map(high => high.smokesHigh);
    
    
    //create x scale with age
    var xagescale = d3.scaleLinear()
    .domain([0, smoker_age.length])
    .range([0, width]);
    console.log(xagescale)

    
    //create y scale
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(smoke_high)])
    .range([height, 0]);



    //define axis
    var bottomAxis = d3.axisBottom(xagescale);
    var leftAxis = d3.axisLeft(yLinearScale);
    // add x-axis
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    // Add y-axis
    chartGroup.append("g").call(leftAxis);
    
    

  // append circles to data points
    chartGroup.selectAll("circle")
    .data(smoke_high)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xagescale(i))
    .attr("cy", d => yLinearScale(d))
    .attr("r", "5")
    .attr("fill", "red");


});

