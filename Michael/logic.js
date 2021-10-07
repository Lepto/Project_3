//1 read data
// const sampleData = [...]

// 2. Format
const renderGraph = function (selectedState) {
    let countOfFiveStars = 0
    let countOfFourStars = 0
    let countOfThreeStars = 0
    let countOfTwoStars = 0
    let countOfOneStar = 0

    let stateStars = businessData.filter(function (obj) {
        return obj.state === selectedState;
    })

    stateStars.forEach(function(obj) {
        switch (obj.stars) {
            case "5":
                countOfFiveStars++;
                break;
            case "4":
                countOfFourStars++;
                break;
            case "3":
                countOfThreeStars++;
                break;
            case "2":
                countOfTwoStars++;
                break;
            case "1":
                countOfOneStar++;
                break;
            default: break;
        }
    })
    // 3. put into graph (Pie Chart)
    var options = {
        series: [
            countOfFiveStars, countOfFourStars, countOfThreeStars, countOfTwoStars, countOfOneStar
        ],
        chart: {
        width: 700,
        type: 'pie',
      },
      labels: ['Five stars', 'Four stars', 'Three stars', 'Two stars', 'One star'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

// default
renderGraph('OR');
