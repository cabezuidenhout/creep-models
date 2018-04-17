const parsedData = JSON.parse(data);

function setTitle( em, material, model) {
  document.querySelector('title').innerText = material + ' ' + model + ' model';
  em.innerText = material + ' ' + model + ' Model';
}

function displayMansonHaferd( em, logta, Ta) {
  const paramTable = document.createElement('table');
  paramTable.classList = 'table';

  const paramHead = paramTable.createTHead();
  paramHead.classList = 'text-primary';

  paramHead.innerHTML = '<th class="text-center">log(ta)</th><th class="text-center">Ta</th>';

  const paramBody = paramTable.createTBody();
  paramBody.innerHTML = `<tr><td class="text-center">${logta}</td><td class="text-center">${Ta}</td></tr>`;

  em.appendChild(paramTable);
}

function plotParameterFit( stressTrain, pTrain, stressPredict, pPredict) {
  const ctx = document.querySelector('#test').getContext("2d");

  const trainPoints = [];
  const predictPoints = [];

  for( let i = 0 ; i < pTrain.length ; i++) {
    trainPoints.push( { x: stressTrain[i], y: pTrain[i] } );
  }

  for( let i = 0;  i < pPredict.length; i++) {
    predictPoints.push( { x: stressPredict[i], y: pPredict[i] } );
  }

  const mChart = new Chart(ctx, {
    type: 'line',
  data: {
    datasets: [{
      label: 'Manson-Haferd Parameters from data',
      backgroundColor:'rgb(255,0,0)',
      borderColor: 'rgb(255,0,0)',
      data: trainPoints,
      fill: false,
      showLine: false,
      pointStyle: 'crossRot',
      pointRadius: '10',
      pointHoverRadius: '20'
    }, {
      label: 'Mastercurve',
      fill: false,
      backgroundColor: 'rgb(0,255,0)',
      borderColor: 'rgb(0,255,0)',
      data: predictPoints,
      pointRadius: '0'
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Parameter Fit'
    },
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

setTitle( document.querySelector('#pageTitle'), parsedData.material, parsedData.model );
displayMansonHaferd( document.querySelector('#modelParameters'), parsedData.logta, parsedData.Ta);
plotParameterFit( parsedData.stressTrain, parsedData.pTrain, parsedData.stressFit, parsedData.pFit);