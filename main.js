//프로젝트 진행현황 중 전체 진행 현황

let input = document.getElementById('play-range'),
  nbr = 3;

let dataset, chart;


function getData(month) {
  const output = Object.entries(dataset).map(country => {
    const [countryName, countryData] = country;
    return [countryName, Number(countryData[month])];
  });
  return [output[0], output.slice(1, nbr)];
}

function getSubtitle() {

  const total_number = getData(input.value)[0][1];
  return `<span style="font-size: 25px">${input.value}</span>
      <br>
      <span style="font-size: 20px">
          Total: <b class="total-number"> ${total_number}</b> 건
      </span>`;
}


(async () => {
  dataset = await fetch(
    'data/data.json'
  ).then(response => response.json());

  chart = Highcharts.chart('donut_container', {
    title: false,
    credits: {
      enabled: false
    },
    subtitle: {
      useHTML: true,
      text: getSubtitle(),
      floating: true,
      verticalAlign: 'middle',
      y: 10
    },

    legend: {
      enabled: false
    },

    tooltip: {
      valueSuffix: ' 건'
    },

    plotOptions: {
      series: {
        borderWidth: 0,
        colorByPoint: true,
        type: 'pie',
        size: '100%',
        innerSize: '50%',
        dataLabels: {
          enabled: true,
          crop: false,
          distance: '-10%',
          style: {
            fontWeight: 'bold',
            fontSize: '16px'
          },
          connectorWidth: 0
        }
      }
    },
    colors: ['#F46161', '#89CFCD'],
    series: [
      {
        type: 'pie',
        name: input.value,
        data: getData(input.value)[1]
      }
    ]
  });
})();

//프로젝트 진행현황 중 고객사별 현황
let customer_graph = document.querySelector(".graph-desc")
let corp1 = customer_graph.querySelector('.corp1-point');
let corp2 = customer_graph.querySelector('.corp2-point');
let corp3 = customer_graph.querySelector('.corp3-point');
let corp4 = customer_graph.querySelector('.corp4-point');
let corp5 = customer_graph.querySelector('.corp5-point');

let corp1_per = corp1.previousElementSibling;
let corp2_per = corp2.previousElementSibling;
let corp3_per = corp3.previousElementSibling;
let corp4_per = corp4.previousElementSibling;
let corp5_per = corp5.previousElementSibling;

let num = document.querySelector('.total-number');
let corp1_current = corp1.innerText.slice(0, -1);
// corp1_per.innerText = corp1_current / total_number;
console.log(num);




//open issue  현황
Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  credits: {
    enabled: false
  },
  title: {
    text: 'OPEN ISSUE 현황',
    align: 'center'
  },
  xAxis: {
    categories: ['23-02', '23-03', '23-04', '23-05', '23-06', '23-07'],
    accessibility: {
      description: 'months'
    }
  },
  yAxis: {
    title: false,
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [
    {
      name: 'issue',
      data: [4, 11, 6, 7, 9, 6]
    },
  ]

});
