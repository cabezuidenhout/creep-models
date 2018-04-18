const orange = '#f96332';
const blue = '#2a5788';
const randomColor = () => {
  return `rgb(${Math.floor(256*Math.random())},${Math.floor(256*Math.random())},${Math.floor(256*Math.random())})`;
}

function setTitle( material ) {
  document.querySelector('title').innerText = material + ' Manson-Haferd Model';
  document.querySelector('#pageTitle').innerText = material + ' Manson-Haferd Model';
}

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

function showStressTestTable( stressTest ) {
  const table = document.querySelector('#stressTest');

  const head = table.createTHead();
  head.classList = 'text-primary';
  
  let headRow = head.insertRow();

  let headCell = document.createElement('th');
  headCell.classList = 'text-center';

  headCell.innerHTML = 'Temperature (&deg;C)';
  headCell.rowSpan = 2;

  headRow.appendChild( headCell );

  for( let i = 0; i < stressTest.tr.length; i++) {
    headCell = document.createElement('th');
    headCell.classList = 'text-center';
    headCell.innerText = stressTest.tr[i] + ' h';
    headCell.colSpan = 4;
    headRow.appendChild(headCell);
  }

  headRow = head.insertRow();

  for( let i = 0; i < stressTest.tr.length ; i++ ) {
    headCell = document.createElement('th');
    headCell.classList = 'text-center';
    headCell.innerText = 'Code Stress (MPa)';    
    headRow.appendChild(headCell);

    headCell = document.createElement('th');
    headCell.classList = 'text-center';
    headCell.innerText = 'Predicted Stress (MPa)';    
    headRow.appendChild(headCell);

    headCell = document.createElement('th');
    headCell.classList = 'text-center';
    headCell.innerText = 'Error (MPa)';    
    headRow.appendChild(headCell);

    headCell = document.createElement('th');
    headCell.classList = 'text-center';
    headCell.innerHTML = '|Error| (&percnt;)';    
    headRow.appendChild(headCell);
  }

  const body = table.createTBody();
  let bodyRow, bodyCell;

  for( let r = 0; r < stressTest.T.length ; r++ ) {
    bodyRow = body.insertRow();

    bodyCell = bodyRow.insertCell();
    bodyCell.classList = 'text-center cp';
    bodyCell.title = 'Click to copy to Clipboard';
    bodyCell.innerText = stressTest.T[r];

    for( let c = 0; c < stressTest.tr.length; c++) {
      bodyCell = bodyRow.insertCell();
      bodyCell.classList = 'text-center cp';
      bodyCell.title = 'Click to copy to Clipboard';
      bodyCell.innerText = stressTest.stressActual[r][c];

      bodyCell = bodyRow.insertCell();
      bodyCell.classList = 'text-center cp';
      bodyCell.title = 'Click to copy to Clipboard';
      bodyCell.innerText = stressTest.stressPredicted[r][c];

      bodyCell = bodyRow.insertCell();
      bodyCell.classList = 'text-center cp';
      bodyCell.title = 'Click to copy to Clipboard';
      bodyCell.innerText = stressTest.errors.Err[r][c].toFixed(3);

      bodyCell = bodyRow.insertCell();
      bodyCell.classList = 'text-center cp';
      bodyCell.title = 'Click to copy to Clipboard';
      bodyCell.innerText = Math.abs(stressTest.errors.Percentage[r][c]).toFixed(3);
    }
  }

  document.querySelector('#stressTestMinErr').innerText = stressTest.errors.MinAbs;
  document.querySelector('#stressTestAvgErr').innerText = stressTest.errors.AverageAbs;
  document.querySelector('#stressTestMaxErr').innerText = stressTest.errors.MaxAbs;

  document.querySelector('#stressTestR').innerText = stressTest.errors.R.toFixed(3);
  document.querySelector('#stressTestMSE').innerText = stressTest.errors.MSE.toFixed(3);

  document.querySelector('#stressTestMinErrP').innerText = stressTest.errors.minAbsPercentage.toFixed(3);
  document.querySelector('#stressTestAvgErrP').innerText = stressTest.errors.AverageAbsPercentage.toFixed(3);
  document.querySelector('#stressTestMaxErrP').innerText = stressTest.errors.maxAbsPercentage.toFixed(3);
}

function showTrTestTable( trTest ) {  
  const body = document.querySelector('#trTest');

  for( let i = 0; i < trTest.T.length; i++) {
    const row = body.insertRow();
    
    let cell = row.insertCell();
    cell.classList = 'text-center cp';
    cell.title = 'Click to copy to Clipboard';
    cell.innerText = trTest.T[i];

    cell = row.insertCell();
    cell.classList = 'text-center cp';
    cell.title = 'Click to copy to Clipboard';
    cell.innerText = trTest.trActual[i].toFixed(0);

    cell = row.insertCell();
    cell.classList = 'text-center cp';
    cell.title = 'Click to copy to Clipboard';
    cell.innerText = trTest.trPredicted[i].toFixed(0);

    cell = row.insertCell();
    cell.classList = 'text-center cp';
    cell.title = 'Click to copy to Clipboard';
    cell.innerText = trTest.errors.Err[i].toFixed(0);

    cell = row.insertCell();
    cell.classList = 'text-center cp';
    cell.title = 'Click to copy to Clipboard';
    cell.innerText = Math.abs(trTest.errors.Percentage[i]).toFixed(3);
  }

  document.querySelector('#trTestMinErr').innerText = trTest.errors.MinAbs.toFixed(0);
  document.querySelector('#trTestAvgErr').innerText = trTest.errors.AverageAbs.toFixed(0);
  document.querySelector('#trTestMaxErr').innerText = trTest.errors.MaxAbs.toFixed(0);

  document.querySelector('#trTestR').innerText = trTest.errors.R.toFixed(3);
  document.querySelector('#trTestMSE').innerText = trTest.errors.MSE.toFixed(3);

  document.querySelector('#trTestMinErrP').innerText = trTest.errors.minAbsPercentage.toFixed(3);
  document.querySelector('#trTestAvgErrP').innerText = trTest.errors.AverageAbsPercentage.toFixed(3);
  document.querySelector('#trTestMaxErrP').innerText = trTest.errors.maxAbsPercentage.toFixed(3);
}

function plotConstantStress( constStress ) {
  const ctx = document.querySelector('#constantStress').getContext('2d');

  const dataPoints = [];
  for( let i = 0; i < constStress.tr.length; i++) {
    dataPoints.push( { x: constStress.T[i][0] , y : constStress.tr[i][0] } );
  }

  const chart = new Chart( ctx, {
    type: 'line',
    data : {
      datasets: [{
        label: `${constStress.stress} MPa`,
        backgroundColor: blue,
        borderColor: blue,
        data: dataPoints,
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
            labelString: 'Temperature (°C)'
          },
          type: 'linear'
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time to Rupture (h)'
          },
          type: 'logarithmic'
        }]
      }
    }
  });
}

function plotConstantTemperature( constT ) {
  const ctx = document.querySelector('#constantTemperature').getContext('2d');

  const dataPoints = [];
  for( let i = 0; i < constT.tr.length; i++) {
    dataPoints.push( { x: constT.stress[i] , y : constT.tr[i][0] } );
  }

  const chart = new Chart( ctx, {
    type: 'line',
    data : {
      datasets: [{
        label: `${constT.T} (°C)`,
        backgroundColor: blue,
        borderColor: blue,
        data: dataPoints,
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
            labelString: 'Time to Rupture (h)'
          },
          type: 'logarithmic'
        }]
      }
    }
  });
}