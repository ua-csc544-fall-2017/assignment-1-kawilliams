//////////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries

var svgSize = 500;
var bands = 50;

var xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
var yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

function createSvg(sel)
{
    return sel
        .append("svg")
        .attr("width", svgSize)
        .attr("height", svgSize);
}

function createRects(sel)
{
    return sel
        .append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale(d.Col); })
        .attr("y", function(d) { return yScale(d.Row); })
        .attr("width", 10)
        .attr("height", 10);
}

function createPaths(sel)
{
    return sel
        .append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) {
            return "translate(" + xScale(d.Col) + "," + yScale(d.Row) + ")";
        })
        .append("path");
}

d3.selection.prototype.callReturn = function(callable)
{
    return callable(this);
};

//////////////////////////////////////////////////////////////////////////////

function glyphD(d) {
    // write this!
}

function glyphStroke(d) {
    // write this!
}

function colorT1(d) {
    // Color for temp
  var scaleT1 = d3.scaleLinear().domain([-70, -60])
              .range([d3.hsl("yellow"), d3.hsl("teal")]);
  return scaleT1(d.T);
}

function colorP1(d) {
    // Diverging color map
  var scaleP1 = d3.scaleLinear().domain([-500,0, 200])
              .range([d3.hsl("blue"), d3.hsl("white"), d3.hsl("red")]);
  return scaleP1(d.P);
}

function colorPT(d) {
    // Single color for both temp and pressure
  var bivarColor = [ [d3.hcl(80,83,77), d3.hcl(80,92,53), d3.hcl("black")], 
                    [d3.hcl(80,55,95), d3.hcl(198,5,56), d3.hcl(258,27,52)], 
                    [d3.hcl("white"), d3.hcl(258,20,90), d3.hcl(258,46,67)]];
  var xScale = d3.scaleQuantize().domain([-70,-65,-60]).range([0,1,2]);
  var yScale = d3.scaleQuantize().domain([-500,-150,200]).range([0,1,2]);
  
  return bivarColor[xScale(d.T)][yScale(d.P)];
}

function colorT2(d) {
    // write this!
}

//////////////////////////////////////////////////////////////////////////////
/*
d3.select("#plot1-temperature")
    .callReturn(createSvg)
    .callReturn(createRects)
    .attr("fill", colorT1);

d3.select("#plot1-pressure")
    .callReturn(createSvg)
    .callReturn(createRects)
    .attr("fill", colorP1);
*/
d3.select("#plot2-bivariate-color")
    .callReturn(createSvg)
    .callReturn(createRects)
    .attr("fill", colorPT);

var bivariateSvg = d3.select("#plot3-bivariate-glyph")
        .callReturn(createSvg);

bivariateSvg
    .callReturn(createRects)
    .attr("fill", colorT2);

bivariateSvg
    .callReturn(createPaths)
    .attr("d", glyphD)
    .attr("stroke", glyphStroke)
    .attr("stroke-width", 1);
