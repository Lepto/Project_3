//------------------------------------------------------------------------------------------------------
// Read Data from JSON that is obtained from server side (python queries to SQLite DB) via D3
d3.json('/getMonthlyProgress').then(function(progress){
d3.json('/getCategories').then(function(categories){
  d3.json('/getAttributes').then(function(attributes){
    popularityAnalysis(progress);
    categoryAnalysis(categories);
    attributeAnalysis(attributes)
  });
});
})

//  ------------------------------------------------------------------------------------------------------
// Draw animated Line chart to vizualize the progress of Coffee Popularity
function popularityAnalysis(progress){
  counts = progress.map(pr => pr.count)
  months = progress.map(pr => pr.month)

  // data
  const data = [];
  const labels = [];

  for (let i = 0; i < counts.length; i++) {
    data.push({x: i, y: counts[i]});
    var month = months[i].split('-')[0] +"-"+ months[i].split('-')[1]
    labels.push(month);
  }

  //animation
  const totalDuration = 8000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};

// configuration
  const config = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        borderColor: 'red',
        borderWidth: 2,
        radius: 0,
        data: data,
      },
    ]
    },
    options: {
      animation,
      interaction: {
        intersect: false
      },
      plugins: {
        legend: false,
        title: {
          display: true,
          text: 'The popularity of coffee shops over years',
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'Reviews count'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Months'
          },
          ticks: {
            callback: function(val, index) {
              return index % 2 === 0 ? this.getLabelForValue(val) : '';
            },
            color: 'black',
          }
        }
      }     
    }
  };
var myChart = new Chart('progress', config);
}

//  ------------------------------------------------------------------------------------------------------
// Perform analysis by attributes 
function attributeAnalysis(attributes){
  drawSplineChart(attributes);
}

//  ------------------------------------------------------------------------------------------------------
// Attribute Analysis Drawing - Spline chart for All Attributes and Area Chart for one selected attribute
function drawSplineChart(attributes){

  // Get list of attribute name, the last one is not an attribute name, pop it
  attr_names = attributes.map(attr=>Object.keys(attr)[0])
  attr_names.pop()

  // select dropdown menu
  let dropdMenu = d3.select("#selAttribute");

  // Set Default value
  option = dropdMenu.append("option")
  option.property("value","All")
  option.text("All")

  // set values for dropdown menu
  attr_names.forEach(att => {
      option = dropdMenu.append("option")
      option.property("value",att)
      option.text(att)
  });

  // connect function to on change event when element is selected
  d3.select("#selAttribute").on("change", optionChanged);

  inner_list = attributes.map(attr => attr[attr_names[1]])
  state_total = attributes[6]

  states = inner_list[1].map(il=>il.state)

  // For Each attributes calculate the percentage of coffe shop with this attributes by state
  var percent_by_state = []
  attr_names.forEach(at => {
    ct_st_for_at = attributes.filter(att => att[at])[0][at]
    attr_percent = []
    states.forEach(st => {
      sttotal = state_total.filter(stt => stt.state==st)[0].count
      st_at_total = ct_st_for_at.filter(ctst => ctst.state==st)[0].count
      val = Math.round(st_at_total/sttotal*100, 2);
      dict = {}
      dict["state"] = st
      dict["percentage"] = val
      attr_percent.push(dict)
    })
    dict_st = {}
    dict_st["attribute"] = at
    dict_st["values"] = attr_percent
    percent_by_state.push(dict_st)
  })

  // function that draws spline chart for all attributes
  function drawForAll(){
    // create datapoints in for loop - should be [{label:,y:[val1.val2]}]
    listofDataPoints = []

    percent_by_state.forEach(st => {
      dict = {} 
      y_values = st.values.map(perc => perc.percentage)
      minY = Math.min.apply(Math, y_values)
      maxY = Math.max.apply(Math, y_values)
      minState = st.values.filter(st => st.percentage==minY)[0].state
      maxState = st.values.filter(st => st.percentage==maxY)[0].state
      dict["label"] = [st.attribute, minState+'->'+maxState]
      dict["y"] = [minY, maxY]
      listofDataPoints.push(dict)
    })

    var chart = new CanvasJS.Chart("spline", {
      animationEnabled: true,
      title:{
        text: "Variation of attributtes coverage among States",
        fontSize: 22,
        titleFontWeight: "light",
        titleFontFamily: "Calibri"
      },		
      axisX: {
        labelAngle: 45
      },
      axisY: { 
        title: "Attributes coverage (%)",
        fontSize: 18,
        suffix: " %"
      },
      data: [{
        type: "rangeSplineArea",
        indexLabel: "{y[#index]}%",
        toolTipContent: "{label[0]} </br> <strong>States: </strong> </br> Min to Max: {label[1]} {y[0]} -> {y[1]}",
        dataPoints:
        listofDataPoints
      }],
    }, 
    );
    chart.render();
  }
  
  // Draw default chart for all attributes
  drawForAll();

  // Function that draws chart depending on selected item - Spline for All, Area for selected attribute
  function optionChanged(){
    // Save selected in dropdown value
    attribute = dropdMenu.property("value");
  
    if (attribute == 'All'){
      drawForAll();
    } else{
      drawAreaChart(attribute, percent_by_state)
    }
  }

}

//  ------------------------------------------------------------------------------------------------------
// Function that draws Area Chart based on selected Attribute
function drawAreaChart(sel_attr, attr_percentages){

  attributes = attr_percentages.map(att => att.attribute)
  values = attr_percentages.filter(att => att.attribute == sel_attr)[0].values
  states = values.map(val => val.state)
  percentage = values.map(val => val.percentage)

  var mydataPoints = []
  for (i=0; i<states.length; i++){
    dict = {}
    dict["y"] = percentage[i]
    dict["label"] = states[i]
    mydataPoints.push(dict)
  }

  var chart = new CanvasJS.Chart("spline", {
    animationEnabled: true,
    title: {
      text: `${sel_attr} coverage across States`,
      fontSize: 18,
    },
    axisX: {
    },
    axisY: {
      title: "Attribute coverage (%)",
      includeZero: true,
      suffix: "%"
    },
    data: [{
      indexLabelFontColor: "darkSlateGray",
      name: "views",
      type: "area",
      fillOpacity: .5,
      dataPoints: mydataPoints
    }]
  });
  chart.render();
}

//  ------------------------------------------------------------------------------------------------------
// Function for Category Analysis
function categoryAnalysis(data){
    
    let categories = new Set(data.map(element=>element.category))
  
    let dropdMenu = d3.select("#selCategory");

    // Set Default value
    option = dropdMenu.append("option")
    option.property("value","All")
    option.text("All")

    // Populate drop down with categories
    categories.forEach(cat => {
        option = dropdMenu.append("option")
        option.property("value",cat)
        option.text(cat)
    });

    // draw default chart with all
    drawStackedChart("All", data);

    d3.select("#selCategory").on("change", optionChanged);

    // Draw Plots and show Metadata depending on the drop box selection
    function optionChanged(){
      // Save selected in dropdown value
      category = dropdMenu.property("value");
      drawStackedChart(category, data);

  }
}

//  ------------------------------------------------------------------------------------------------------
// Draw Stacked Chart based on selected Category
function drawStackedChart(sel_cat, categories) {

  console.log(categories)
  // Get Categories names
  let unique = Array.from(new Set(categories.map(cat=>cat.category)))

  // Get States
  states = categories.filter(cat=>cat.category==unique[0])
                      .map(cat=>cat.state);

  chart_data = []

  if (sel_cat=='All'){

    unique.forEach(element => {
      points = [];
      counts = categories.filter(cat=>cat.category==element)
                      .map(cat=>cat.count);
      for (var i=0; i<counts.length; i++){
          points.push({label: states[i], y: counts[i]})
      }
                  
      let cat_chart =  {
        type: "stackedBar",
        fillOpacity: .75, 
        name: element,
        showInLegend: "true",
        dataPoints: points,
      }
      chart_data.push(cat_chart)
    });
} else{
    counts = categories.filter(cat=>cat.category==sel_cat)
                      .map(cat=>cat.count);
    points = [];
    for (var i=0; i<counts.length; i++){
        points.push({label: states[i], y: counts[i]})
    }

    let cat_chart =  {
      type: "stackedBar",
      name: sel_cat,
      showInLegend: "true",
      dataPoints: points,
    }
    chart_data.push(cat_chart)
}

  var chart = new CanvasJS.Chart("bar", {
    animationEnabled: true,
    title:{
      text: "Coffee shops by different categories in States",
      fontSize: 22,
      titleFontWeight: "light",
    },
    axisX: {
    },
    axisY: {
    },
    toolTip: {
      shared: true
    },
    legend:{
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: chart_data

  });
  chart.render();
  
  function toggleDataSeries(e) {
    if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }  
  }

