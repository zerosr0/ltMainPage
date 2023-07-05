//프로젝트 진행현황 중 전체 진행 현황

const startYear = 2302,
  endYear = 2307,
  input = document.getElementById('play-range'),
  nbr = 6;

let dataset, chart;

function getData(year) {
  const output = Object.entries(dataset).map(country => {
    const [countryName, countryData] = country;
    return [countryName, Number(countryData[year])];
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

  chart = Highcharts.chart('donut-container', {
    title: {
      text: '전체 진행 현황',
      align: 'left'
    },
    credits: {
      enabled: false
    },
    subtitle: {
      useHTML: true,
      text: getSubtitle(),
      floating: true,
      verticalAlign: 'middle',
      y: 30
    },

    legend: {
      enabled: false
    },

    tooltip: {
      valueDecimals: 2,
      valueSuffix: ' TWh'
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


/*
 * Update the chart. This happens either on updating (moving) the range input,
 * or from a timer when the timeline is playing.
 */
function update(increment) {
  if (increment) {
    input.value = parseInt(input.value, 10) + increment;
  }
  if (input.value >= endYear) {
    // Auto-pause
    pause(btn);
  }

  chart.update(
    {
      subtitle: {
        text: getSubtitle()
      }
    },
    false,
    false,
    false
  );

  chart.series[0].update({
    name: input.value,
    data: getData(input.value)[1]
  });
}

/*
 * Trigger the update on the range bar click.
 */
input.addEventListener('input', function () {
  update();
});



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
    crosshair: true,
    accessibility: {
      description: 'months'
    }
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
