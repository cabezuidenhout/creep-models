function showParameters( logta, Ta) {
  document.querySelector('#logtaParam').innerText = logta;
  document.querySelector('#TaParam').innerText = Ta;
}

function showMasterCurve( coefficients ) {
  const row = document.querySelector('#masterCurveCoefficients');

  for( let i = 0 ; i < coefficients.length ;  i++) {
    const cell = row.insertCell();
    cell.classList = 'text-center cp';
    cell.innerText = coefficients[i];
    cell.title = 'Click to copy to Clipboard';
  }
}

function showRanges( stressRange, temperatureRange ) {
  document.querySelector('#minStress').innerText = stressRange.min;
  document.querySelector('#minTemperature').innerText = temperatureRange.min;
  document.querySelector('#maxStress').innerText = stressRange.max;
  document.querySelector('#maxTemperature').innerText = temperatureRange.max;
}

function plotParameterFit( trainData, testData ) {

  const ctx = document.querySelector('#parameterFit').getContext('2d');

  const trainPoints = [];
  const testPoints = [];

  for( let i = 0; i < trainData.stress.length ; i++ ) {
    trainPoints.push( { x: trainData.stress[i], y: trainData.p[i] } );
  }
  
  for( let i = 0; i < testData.stress.length ; i++ ) {
    testPoints.push( { x: testData.stress[i], y: testData.p[i] } );
  }

  const plot = new Chart( ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Code Parameters',
        backgroundColor: orange,
        borderColor: orange,
        data: trainPoints,
        fill: false,
        showLine: false,
        pointStyle: 'crossRot',
        pointRadius: '10',
        pointHoverRadius: '20'
      },{
        label: 'Mastercurve',
        backgroundColor: blue,
        borderColor: blue,
        data: testPoints,
        fill: false,        
        pointRadius: '0',        
      }]
    },
    options: {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Stress (MPa)'
          },
          type: 'linear'
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Manson-Haferd Parameter'
          },
          type: 'linear'
        }]
      }
    }
  });
}

function plotIsoStress( isoStressData, isoStressFit ) {

  document.querySelector('#isoStressTitle').innerText += ` (${isoStressData.tolerance} MPa tolerance)`;
  
  const ctx = document.querySelector('#isoStress').getContext('2d');

  const datasets = [];

  let minX = Number.MAX_VALUE;
  let maxX = 0;

  for( let i = 0; i < isoStressData.stress.length; i++) {

    const lineColor = randomColor();

    const rawData = [];

    for( let j = 0; j < isoStressData.tr[i].length; j++) {

      if( isoStressData.T[i][j] < minX ) {
        minX = isoStressData.T[i][j];
      }

      if( isoStressData.T[i][j] > maxX ) {
        maxX = isoStressData.T[i][j];
      }

      rawData.push( { x: isoStressData.T[i][j], y: Math.log10( isoStressData.tr[i][j] ) } );
    }

    datasets.push( {
      label: `${isoStressData.stress[i]} MPa`,
      backgroundColor: lineColor,
      borderColor: lineColor,
      data: rawData,
      fill: false,
      showLine: false,
      pointStyle: 'crossRot',
      pointRadius: '10',
      pointHoverRadius: '20'
    });

    const fitData = [];

    for( let j = 0; j < isoStressFit.tr[i].length; j++) {
      
      if( isoStressFit.T[i][j] < minX ) {
        minX = isoStressData.T[i][j];
      }

      if( isoStressFit.T[i][j] > maxX ) {
        maxX = isoStressData.T[i][j];
      }

      fitData.push( { x: isoStressFit.T[i][j], y: Math.log10( isoStressFit.tr[i][j] ) } );
    }

    datasets.push( {
      label: `${isoStressData.stress[i]} MPa Fit`,
      backgroundColor: lineColor,
      borderColor: lineColor,
      data: rawData,
      fill: false,      
      pointRadius: '0'      
    });
  }


  const plot = new Chart( ctx, {
    type: 'line',
    data: {
      datasets: datasets
    },
    options: {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Temperature (degC)'
          },
          type: 'linear',
          ticks: {
            min: minX-10,
            max: maxX+10
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'log(t)'
          },
          type: 'linear'
        }]
      },
      legend: {
        labels: {
          filter: function( legendItem, chartData) {
            if( (legendItem.datasetIndex % 2) === 0 ) {
              return true;
            }

            return false;
          }
        }
      }
    }
  });

}

