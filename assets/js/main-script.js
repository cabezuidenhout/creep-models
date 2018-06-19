HTMLElement.prototype.hasClass = function (className) {
  if (this.classList) return this.classList.contains(className);else return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

HTMLElement.prototype.addClass = function (className) {
  if (this.classList) this.classList.add(className);else if (!hasClass(this, className)) this.className += " " + className;
};

Math.log10 = Math.log10 || function (x) {
  return Math.log(x) * Math.LOG10E;
};

// -- Colors
var colors = ["#2a5788", 
"#f96332", 
"#9b59b6", 
"#2ecc71", 
"#1abc9c", 
"#2c3e50", 
"#7b6ce0", 
"#cc3415", 
"#286ea9",
"#4ff4b7", 
"#819e53", 
"#4089d7",
"#b797fd",
"#0ec2f4",
"#ca4d2e", 
"#70b2e8", 
"#4ddda2", 
"#c49d58",
"#d2632d", 
"#be9528",
"#e894bf",
"#2de66f",
"#61a611",
"#d632f8",
"#bf379f",
"#fd29c6", 
"#370d0f", 
"#c16fe0", 
"#eaeb50",
"#4bc7e1",
"#85fbb6", 
"#ceb0de",
"#6a1db2",
"#2fb642", 
"#5958b4",
"#233081", 
"#fb7fb5",
"#a452ca",
"#106c7f",
"#c338ca",
"#c8780e", 
"#74f51a",
"#b82cef", 
"#be7f1",
"#c80de4",
"#53ba84",
"#391c9d", 
"#cb6a6c",
"#29d2a0",
"#2ecc50"]

function getColor( index  ) {

  if( index === undefined ) {
    index = -1;
  }

  if( index >= 0 && index < colors.length ) {
    return colors[index];
  } else {
    return ('#'+(Math.random()*0xFFFFFF<<0).toString(16) );
  }
}
// -- END Colors

// -- Table Functions
function setTitle(titleElement, title) {
  document.getElementsByTagName('title')[0].innerText = title;
  titleElement.innerText = title;
}

function createHead(tableElement) {
  var head = tableElement.createTHead();
  head.addClass('text-info');
  return head;
}

function createHeadCell(cellContent) {
  var headCell = document.createElement('th');
  headCell.addClass('text-center');
  headCell.innerHTML = cellContent;
  return headCell;
}

function createBodyCell(cellContent) {
  var bodyCell = document.createElement('td');
  bodyCell.addClass('text-center');
  bodyCell.addClass('cp');
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerHTML = cellContent;
  return bodyCell;
}

function createBodyLabelCell(cellContent) {
  var bodyCell = document.createElement('td');
  bodyCell.addClass('text-center');
  bodyCell.addClass('text-primary');
  bodyCell.innerHTML = cellContent;
  return bodyCell;
}

function createWarning(warningContent) {
  var warningElement = document.createElement('div');
  warningElement.addClass('alert');
  warningElement.addClass('alert-danger');
  warningElement.innerHTML = '<b>Warning - </b> ' + warningContent;
  return warningElement;
}
// -- END Table Functions

// -- Iso-Stress Plots
function plotIsoStress( graphElement, isoStressData, chartTitle ) {
  var data = [];

  if( chartTitle === undefined ) {
    chartTitle = "Time to Rupture vs Temperature";
  }

  for( var s = 0; s < isoStressData.stress.length; s++ ) {
    var x = [];
    var y = [];
    
    var currentStress = isoStressData.stress[s];
    
    if( isoStressData.TData[currentStress] == undefined ) {
      currentStress = Object.keys(isoStressData.TData)[s];
    }

    var currentColor = getColor(s);

    //Plot Data Points
    for( var i = 0; i < isoStressData.TData[currentStress].length; i++) {
      x.push( isoStressData.TData[currentStress][i]);
      y.push( Math.log10(isoStressData.trData[currentStress][i]) );
    }

    var trace = {
      x: x,
      y: y,
      mode: 'markers',
      showlegend: false,
      name: currentStress + 'MPa',
      legendgroup: s,
      marker: { color: currentColor }
    }

    data.push(trace);

    //Plot Fit
    trace = {
      x: isoStressData.fit.T[currentStress],
      y: isoStressData.fit.tr[currentStress],
      mode: 'lines',
      name: currentStress + 'MPa Fit',
      legendgroup: s,
      line: { color: currentColor }
    }

    data.push(trace);
  }

  var layout = {
    title: chartTitle,
    xaxis: {
      title: 'Temperature (°C)'
    },
    yaxis: {
      title: 'log(t) (h)'
    }
  };

  Plotly.newPlot(graphElement, data, layout);
}

function plotIsoStressInverse( graphElement, isoStressData, chartTitle ) {
  var data = [];

  if( chartTitle === undefined ) {
    chartTitle = 'Time to Rupture vs 1/Temperature';
  }

  for( var s = 0; s < isoStressData.stress.length; s++ ) {
    var x = [];
    var y = [];

    var currentStress = isoStressData.stress[s];

    if( isoStressData.TData[currentStress] == undefined ) {
      currentStress = Object.keys(isoStressData.TData)[s];
    }

    var currentColor = getColor(s);

    for( var i = 0; i < isoStressData.TData[currentStress].length; i++) {
      x.push( 1/isoStressData.TData[currentStress][i]);
      y.push( Math.log10(isoStressData.trData[currentStress][i]) );
    }

    //var currentMarker = Plotly.PlotSchema.get().traces.scatter.attributes.marker.symbol.values[ 5+s*8 ];
    
    var currentMarker = 'cross';

    var trace = {
      x: x,
      y: y,
      mode: 'markers',
      showlegend: false,
      name: currentStress + 'MPa',
      legendgroup: s,
      marker: { 
        color: currentColor,
      }
    }

    data.push(trace);  

    trace = {
      x: isoStressData.fitInverse.T[currentStress],
      y: isoStressData.fitInverse.tr[currentStress],
      mode: 'lines',
      name: currentStress + 'MPa Fit',
      legendgroup: s,
      line: { 
        color: currentColor 
      }
    }
    
    data.push(trace);  
  }

  var layout = {
    title: chartTitle,
    xaxis: {
      title: '1/Temperature (1/°C)'
    },
    yaxis: {
      title: 'log(t) (h)'
    }
  };

  Plotly.newPlot(graphElement, data, layout);
}
// -- END Iso-Stress Plots

// -- Master Curve
function showMasterCuveTable(tableElement, coefficients) {
  if (coefficients) {
    var head = createHead(tableElement);
    var headRow = head.insertRow();

    var body = tableElement.createTBody();
    var bodyRow = body.insertRow();

    for (var i = 65; i < 65 + coefficients.length; i++) {
      headRow.appendChild(createHeadCell(String.fromCharCode(i)));
      bodyRow.appendChild(createBodyCell(coefficients[i - 65]));
    }
  } else {
    console.error('Cannot populate master curve table : Coefficients undefined');
  }
}

function plotMasterCurve(graphElement, masterCurveData, title ) {
  var data = [];

  if( title === undefined ) {
    title = 'Mastercurve Fit';
  }

  var x = [];
  var y = [];
  var xFit = [];
  var yFit = [];

  for (var i = 0; i < masterCurveData.trainData.p.length; i++) {
    x.push(masterCurveData.trainData.stress[i]);
    y.push(masterCurveData.trainData.p[i]);
  }

  for (var _i = 0; _i < masterCurveData.testData.p.length; _i++) {
    xFit.push(masterCurveData.testData.stress[_i]);
    yFit.push(masterCurveData.testData.p[_i]);
  }

  var trace = {
    x: x,
    y: y,
    mode: 'markers',
    name: 'Parameters'
  };

  data.push(trace);

  trace = {
    x: xFit,
    y: yFit,
    mode: 'line',
    name: 'Mastercuve'
  };

  data.push(trace);

  var layout = {
    title: title,
    xaxis: {
      title: 'Stress (MPa)'
    },
    yaxis: {
      title: 'Paramter'
    }
  };

  Plotly.newPlot(graphElement, data, layout);
}
// -- END Master Curve

// -- Tests
function showStressTestTable( tableElement, test, warningElement ) {
  var head = createHead(tableElement);

  var headRow = head.insertRow();
  var headCell = createHeadCell('Temperature (&deg;C)');
  headCell.rowSpan = 2;
  headRow.appendChild(headCell);

  for (var i = 0; i < test.tr.length; i++) {
    headCell = createHeadCell(test.tr[i] + ' h');
    headCell.colSpan = 4;
    headRow.appendChild(headCell);
  }

  headRow = head.insertRow();

  for (var c = 0; c < test.tr.length; c++) {
    headCell = createHeadCell('Stress (MPa)');
    headRow.appendChild(headCell);

    headCell = createHeadCell('Predicted Stress (MPa)');
    headRow.appendChild(headCell);

    headCell = createHeadCell('Error (MPa)');
    headRow.appendChild(headCell);

    headCell = createHeadCell('|Error| (%)');
    headRow.appendChild(headCell);
  }

  var body = tableElement.createTBody();
  var bodyRow = void 0;

  var showStressWarning = false;

  for (var r = 0; r < test.T.length; r++) {
    bodyRow = body.insertRow();
    bodyRow.appendChild(createBodyCell(test.T[r]));

    for (var c = 0; c < test.tr.length; c++) {

      if( test.stressActual[r][c] === 0 || test.stressPredicted[r][c] === 0 ) {
        showStressWarning = true;
      }

      bodyRow.appendChild(createBodyCell(test.stressActual[r][c]));
      bodyRow.appendChild(createBodyCell(test.stressPredicted[r][c]));
      bodyRow.appendChild(createBodyCell( test.errors.difference[r][c].toFixed(3) ));
      bodyRow.appendChild(createBodyCell( Math.abs(test.errors.percentage[r][c]).toFixed(3) ));
      /*bodyRow.appendChild(createBodyCell(test.errors.difference[c][r].toFixed(3)));
      bodyRow.appendChild(createBodyCell(Math.abs(test.errors.percentage[c][r]).toFixed(3)));*/
    }
  }  

  if( showStressWarning & ( warningElement != undefined) ) {
    warningElement.appendChild( createWarning("Zero stress values present. Some information in the summary table might not be accurate") )
  }
}

function showTrTestTable( tableElement, test, warningElement ) {
  var head = createHead(tableElement);

  var headRow = head.insertRow();

  var headTitles = ['Temperature (&deg;C)', 'Stress (MPa)', 't<sub>r</sub> (h)', 't<sub>r</sub> Predicted (h)', 'Error (h)', '|Error| (%)'];

  for (var i = 0; i < headTitles.length; i++) {
    headRow.appendChild(createHeadCell(headTitles[i]));
  }

  var body = tableElement.createTBody();
  var bodyRow = void 0;

  var trWarning = false;

  for (var r = 0; r < test.T.length; r++) {
    bodyRow = body.insertRow();
    bodyRow.appendChild(createBodyCell(test.T[r]));
    bodyRow.appendChild(createBodyCell(test.stress[r]));
    bodyRow.appendChild(createBodyCell(test.trActual[r]));
    bodyRow.appendChild(createBodyCell(test.trPredicted[r].toFixed(0)));
    bodyRow.appendChild(createBodyCell(test.errors.difference[r].toFixed(0)));
    bodyRow.appendChild(createBodyCell(Math.abs(test.errors.percentage[r]).toFixed(3)));

    if( (test.trActual[r] === 0 ) || (test.trPredicted[r] === 0 ) ) {
      trWarning = true;
    }
  }

  if( trWarning ) {
    warningElement.appendChild( createWarning("Zero time to rupture values present. Some information in the summary table might not be accurate") );
  }
}

function showTestSummaryTable( tableElement, test, unit ) {
  var head = createHead(tableElement);

  var headRow = head.insertRow();
  var headCell = createHeadCell('');
  headRow.appendChild(headCell);

  headCell = createHeadCell('Minimum');
  headRow.appendChild(headCell);

  headCell = createHeadCell('Average');
  headRow.appendChild(headCell);

  headCell = createHeadCell('Maximum');
  headRow.appendChild(headCell);

  headCell = createHeadCell('R<sup>2</sup>');
  headRow.appendChild(headCell);

  var body = tableElement.createTBody();
  var bodyRow = body.insertRow();
  bodyRow.appendChild(createBodyLabelCell('Error (' + unit + ')'));
  bodyRow.appendChild(createBodyCell(test.errors.minDifference));
  bodyRow.appendChild(createBodyCell(test.errors.averageDifference));
  bodyRow.appendChild(createBodyCell(test.errors.maxDifference));

  var bodyCell = createBodyCell(test.errors.R.toFixed(3));
  bodyCell.rowSpan = 4;
  bodyRow.appendChild(bodyCell);

  bodyRow = body.insertRow();
  bodyRow.appendChild(createBodyLabelCell('Error (%)'));
  bodyRow.appendChild(createBodyCell(test.errors.minPercentage.toFixed(3)));
  bodyRow.appendChild(createBodyCell(test.errors.averagePercentage.toFixed(3)));
  bodyRow.appendChild(createBodyCell(test.errors.maxPercentage.toFixed(3)));

  bodyRow = body.insertRow();
  bodyRow.appendChild(createBodyLabelCell('|Error| (' + unit + ')'));
  bodyRow.appendChild(createBodyCell(test.errors.minAbsoluteDifference));
  bodyRow.appendChild(createBodyCell(test.errors.averageAbsoluteDifference));
  bodyRow.appendChild(createBodyCell(test.errors.maxAbsoluteDifference));

  bodyRow = body.insertRow();
  bodyRow.appendChild(createBodyLabelCell('|Error| (%)'));
  bodyRow.appendChild(createBodyCell(test.errors.minAbsolutePercentage.toFixed(3)));
  bodyRow.appendChild(createBodyCell(test.errors.averageAbsolutePercentage.toFixed(3)));
  bodyRow.appendChild(createBodyCell(test.errors.maxAbsolutePercentage.toFixed(3)));
}
// -- END Tests

// -- Constant Variable Plots
function plotConstantTemperature(graphElement, constT, title) {
  if( title === undefined ) {
    title = "Constant Temperature Plot";
  }
  
  var data = [];

  var x = [];
  var y = [];

  for (var i = 0; i < constT.stress.length; i++) {
    x.push(constT.stress[i]);
    y.push(constT.tr[i][0]); //TODO Fix this
  }

  var trace = {
    x: x,
    y: y,
    mode: 'line',
    name: constT.T + ' °C'
  };

  data.push(trace);

  var layout = {
    title: title,
    xaxis: {
      title: 'Stress (MPa)'
    },
    yaxis: {
      type: 'log',
      title: 'Time to Rupture (h)'
    },
    showlegend: true
  };

  Plotly.newPlot(graphElement, data, layout);
}

function plotConstantStress(graphElement, constStress, title) {
  if( title === undefined ) {
    title = "Constant Stress Plot";
  }
  
  var data = [];

  var x = [];
  var y = [];

  for (var i = 0; i < constStress.T.length; i++) {
    x.push(constStress.T[i][0]); //TODO Fix this
    y.push(constStress.tr[i][0]);
  }

  var trace = {
    x: x,
    y: y,
    mode: 'line',
    name: constStress.stress + ' MPa'
  };

  data.push(trace);

  var layout = {
    title: title,
    xaxis: {
      title: 'Temperature (°C)'
    },
    yaxis: {
      title: 'Time to Rupture (h)'
    },
    showlegend: true
  };

  Plotly.newPlot(graphElement, data, layout);
}
// -- END Constant Variable Plots



document.addEventListener('click', function (event) {
  if (event.target.classList.contains('cp')) {
    var tempTextArea = document.createElement('textArea');
    tempTextArea.value = event.target.innerText;
    var valueCopied = tempTextArea.value;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();

    try {
      var copySuccessfull = document.execCommand('copy');

      if (copySuccessfull) {
        event.target.innerText = 'Copied';
      } else {
        event.target.innerText = 'Could not copy';
      }
    } catch (error) {
      console.error(error);
    }

    document.body.removeChild(tempTextArea);
    setTimeout(resetElement, 1000, event.target, valueCopied);
  }
});

function resetElement( element, content ) {
  element.innerText = content;
}