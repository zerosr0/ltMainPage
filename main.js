//프로젝트 진행현황 중 전체 진행 현황

const startYear = 2302,
  endYear = 2307,
  nbr = 6;

let dataset, chart;

function getData(month) {
  const output = Object.entries(dataset).map(country => {
    const [countryName, countryData] = country;
    return [countryName, Number(countryData[month])];
  });
  return [output[0], output.slice(1, nbr)];
}

function getSubtitle() {
  const totalNumber = '19건';
  return `<span style="font-size: 22px">
            Total: <b> ${totalNumber}</b>
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
      y: -35
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
        name: startYear,
        data: getData(startYear)[1]
      }
    ]
  });
})();




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
