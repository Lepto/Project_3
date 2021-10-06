// Sort the data by city search results descending
console.log(data)
let sortedBycity = data.sort((a, b) => b.numberofbusinesses - a.numberofbusinesses);
// Slice the first 10 objects for plotting
slicedData = sortedBycity.slice(0,20);
// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();
// Trace1 for the city Data
console.log(reversedData)
let trace1 = {
  x: reversedData.map(object => object.numberofbusinesses),
  y: reversedData.map(object => object.city),
  text: reversedData.map(object => object.city),
  name: "city",
  type: "bar",
  orientation: "h"
};

let traceData = [trace1];

// Apply a title to the layout
let layout = {
  title: "Top 20 Cities With Coffee Business",
  margin: {
    l: 100,
    r: 90,
    t: 100,
    b: 15
  }
};
// Note that we use `traceData` here, not `data`
Plotly.newPlot("plot", traceData, layout);
