// // Sort the data by city search results descending
// console.log(searchResults)
// let sortedBycity = searchResults.sort((a, b) => b.reviewcount - a.reviewcount);
// // Slice the first 10 objects for plotting
// slicedData = sortedBycity.slice(0,20);
// // Reverse the array to accommodate Plotly's defaults
// reversedData = slicedData.reverse();
// // Trace1 for the city Data
// console.log(reversedData)
// let trace1 = {
//   x: reversedData.map(object => object.reviewcount),
//   y: reversedData.map(object => object.res),
//   text: reversedData.map(object => object.res),
//   res: "res",
//   type: "bar",
//   orientation: "h"
// };

// let traceData = [trace1];

// // Apply a title to the layout
// let layout = {
//   title: "Top 20 restaurants with highest reviews",
//   margin: {
//     l: 600,
//     r: 90,
//     t: 100,
//     b: 15
//   }
// };
// // Note that we use `traceData` here, not `data`
// Plotly.newPlot("plot", traceData, layout);


// window.ApexCharts = require('apexcharts');
// console.log(window.ApexCharts); // should return modules
// var options = {
//   series: [{
//   res: 'reviewcount',
//   type: 'column',
//   data: [7298,4295,4011,3761,3672]
// }, {
//   res: 'stars',
//   type: 'area',
//   data: [4,5,4,4.5,4.5]
// }],
//   chart: {
//   height: 650,
//   type: 'line',
//   stacked: false,
// },
// // stroke: {
// //   width: [0, 2, 5],
// //   curve: 'smooth'
// // },
// plotOptions: {
//   bar: {
//     columnWidth: '50%'
//   }
// },

// fill: {
//   opacity: [0.85, 0.25, 1],
//   gradient: {
//     inverseColors: false,
//     shade: 'light',
//     type: "vertical",
//     opacityFrom: 0.85,
//     opacityTo: 0.55,
//     // stops: [0, 100, 100, 100]
//   }
// },
// labels: ['Mike Pastry', 'Powell City of Books', 'Blue Star Donuts', 'Atlanta Breakfast Club', 'Salt & Straw'
// ],
// markers: {
//   size: 0
// },
// xaxis: {
//   type: 'String'
// },
// yaxis: {
//   title: {
//     text: 'Number',
//   },
//   min: 0
// },
// tooltip: {
//   shared: true,
//   intersect: false,
//   y: {
//     formatter: function (y) {
//       if (typeof y !== "undefined") {
//         return y.toFixed(0) + " points";
//       }
//       return y;

//     }
//   }
// }
// };

// var chart = new ApexCharts(plot, options);
// chart.render();

// Initialized arrays
let names = []
let rest = []
let citi= []
let reviewcount = []
let stars = []

// For loop to populate arrays
for (let i = 0; i < searchResults.length; i++) {
  row = searchResults[i];
  names.push(row.res);
  // rest.push(row.res);
  citi.push(row.city);
  reviewcount.push(row.reviewcount);
  stars.push(row.stars);
}


// Trace1 for the rest
let trace1 = {
  x: names,
  y: reviewcount,
  // text: rest,
  name: "reviews",
  type: "bar",
  marker:{
    color: 'rgb(195, 124, 182)'
  }
  // hoverinfo='none',
};



// Trace 2 for the citi
let trace2 = {
  x: names,
  y: stars,
  text: citi,
  name: "Stars",
  type: "bar",
  marker:{
    color: 'rgb(137, 195, 124)'
  }
  // hoverinfo='skip'
};

// Create data array
let datareview = [trace1, trace2];


// Apply a title to the layout
let layout = {
  title: "Restaurants With Hightest Ratings & Reviews",
  margin: {
        l: 100,
        r: 100,
        t: 25,
        b: 150
      },
};
console.log(datareview)
// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", datareview, layout);


