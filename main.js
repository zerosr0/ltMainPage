//미처리문서 table에 title 길이 길면 ...으로 축약해서 보여주기
let issueTitle = document.querySelectorAll(".detail-title");

let result = [];
Array.from(issueTitle).map((el, idx) => {
  let titleText = el.innerHTML;
  if (titleText.length > 25) {
    titleText = titleText.slice(0, 25) + '...';
  }

  issueTitle[idx].innerText = titleText;
})



//프로젝트 진행현황 중 전체 진행 현황
let startYear = 1965,
  endYear = 2021,
  input = document.getElementById('play-range'),
  nbr = 3;
let dataset, chart;


function getData(year) {
  const output = Object.entries(dataset).map(country => {
    const [countryName, countryData] = country;
    return [countryName, Number(countryData[year])];
  });
  return [output[0], output.slice(1, nbr)];
}

function getSubtitle() {
  const totalNumber = getData(input.value)[0][1];
  return `<p style="font-size: 22px; text-align:center;">Total : <b>20</b>건</p>
  <br><b style="font-size: 16px">2021.07~2023.07</b>
      `;
}


(async () => {
  dataset = await fetch(
    'https://cdn.jsdelivr.net/gh/highcharts/highcharts@88f2067/samples/data/nuclear-energy-production.json'
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
        name: startYear,
        data: getData(startYear)[1]
      }
    ]
  });
})();

//프로젝트 진행현황 중 고객사별 현황



//open issue  현황
Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    align: 'center',
    text: 'OPEN ISSUE 현황'
  },
  subtitle: {
    enabled: false,
  },
  accessibility: {
    announceNewData: {
      enabled: true
    }
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    title: {
      text: ''
    }

  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.y}건'
      }
    }
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}건</b>'
  },

  series: [
    {
      name: 'Open Issue',
      colorByPoint: true,
      data: [
        {
          name: '23-02',
          y: 4,
          color: '#bcacfc',
        },
        {
          name: '23-03',
          y: 11,
          color: '#bcacfc',
        },
        {
          name: '23-04',
          y: 6,
          color: '#bcacfc',
        },
        {
          name: '23-05',
          y: 5,
          color: '#bcacfc',
        },
        {
          name: '23-06',
          y: 10,
          color: '#bcacfc',
        },
        {
          name: '23-07',
          y: 7,
          color: '#bcacfc',
        },
      ]
    }
  ],
  drilldown: {
    breadcrumbs: {
      position: {
        align: 'right'
      }
    },
  },
  credits: {
    enabled: false
  },

});
