//TODO : Add model ranges
const parsedData = JSON.parse(data);

const orange = '#f96332';
const blue = '#2a5788';
const randomColor = () => {
  return `rgb(${Math.floor(256*Math.random())},${Math.floor(256*Math.random())},${Math.floor(256*Math.random())})`;
}


function setTitle( titleElement, material, model) {
  document.querySelector('title').innerText = material + ' ' + model + ' model';
  titleElement.innerText = material + ' ' + model + ' Model';
}

function showStressTestTable( tableElement , stressTest ) {
  const table = tableElement;

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
}

function showTrTestTable( tableElement,  trTest ) {  
  const table = tableElement;

  const head = table.createTHead();
  head.classList = 'text-primary';

  const headRow = head.insertRow();

  let headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = 'Temperature (&deg;C)';
  headRow.appendChild(headCell);

  headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = 'Code Time to Rupture (h)';
  headRow.appendChild(headCell);

  headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = 'Predicted Time to Rupture (h)';
  headRow.appendChild(headCell);

  headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = 'Error (h)';
  headRow.appendChild(headCell);

  headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = '|Error| (%)';
  headRow.appendChild(headCell);

  const body = table.createTBody();

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
}

function showTestSummaryTable( tableElement, testErrors, unit, decimals = 3 ) {
  const errorUnit = ( unit !== undefined ? '(' + unit + ')' : '');
  const table = tableElement;  

  const head = table.createTHead();
  head.classList = 'text-primary';

  const headRow = head.insertRow();

  let headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = '';
  headRow.appendChild(headCell);

  headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = 'Minimum';
  headRow.appendChild(headCell);

  headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = 'Average';
  headRow.appendChild(headCell);

  headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = 'Maximum';
  headRow.appendChild(headCell);

  headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = 'R<sup>2</sup>';
  headRow.appendChild(headCell);

  const body = table.createTBody();
  let bodyRow, bodyCell;

  bodyRow = body.insertRow();
  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-primary text-center';
  bodyCell.innerText = 'Error ' + errorUnit;

  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerText = testErrors.Min.toFixed(decimals);

  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerText = testErrors.Average.toFixed(decimals);

  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerText = testErrors.Max.toFixed(decimals);

  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.rowSpan = 3;
  bodyCell.innerText = testErrors.R.toFixed(3);


  bodyRow = body.insertRow();
  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-primary text-center';
  bodyCell.innerText = '|Error| ' + errorUnit;

  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerText = testErrors.MinAbs.toFixed(decimals);

  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerText = testErrors.AverageAbs.toFixed(decimals);

  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerText = testErrors.MaxAbs.toFixed(decimals);

  bodyRow = body.insertRow();
  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-primary text-center';
  bodyCell.innerHTML = '|Error| (&percnt;)'

  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerText = testErrors.minAbsPercentage.toFixed(3);

  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerText = testErrors.AverageAbsPercentage.toFixed(3);

  bodyCell = bodyRow.insertCell();
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerText = testErrors.maxAbsPercentage.toFixed(3);
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

document.addEventListener( 'click', (event) => {
  if( event.target.classList.contains('cp') ) {
    const tempTextArea = document.createElement('textArea');
    tempTextArea.value = event.target.innerText;
    const valueCopied = event.target.innerText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();

    try{
      let copySuccessfull = document.execCommand('copy');

      if( copySuccessfull ) {
        event.target.innerText = 'Copied';
      } else {
        event.target.innerText = 'Could not copy';
      }
      
    } catch( error ) {
      console.error(error);
    }

    document.body.removeChild(tempTextArea);
    setTimeout( resetElement, 1000, event.target, valueCopied);
  }
});

function resetElement( em , emContent ) {
  em.innerText = emContent;  
}