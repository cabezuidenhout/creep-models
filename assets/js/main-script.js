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
var colors = ["#51bcda", 
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

// -- Classical Models
function showParameterEquation( eqElement, modelName ) {
  eqElement.src = 'img/' + modelName + '/parameter.gif';
}

function showTrSimplifiedEquation( eqElement, modelName ) {
  eqElement.src = 'img/' + modelName + '/trSimplified.gif';
}

function showTrEquation( eqElement, modelName ) {
  eqElement.src = 'img/' + modelName + '/tr.gif';
}


function showConstantsTable( tableElement, modelName, constants ) {

  var head = createHead(tableElement);
  var headRow = head.insertRow();
  var body = tableElement.createTBody();
  var bodyRow = body.insertRow();

  var constantNames = ['a','b','c','d','f','g'];

  if( modelName === "Manson-Haferd" ) {
    headRow.appendChild(createHeadCell('log(t<sub>a</sub>)'));
    headRow.appendChild(createHeadCell('T<sub>a</sub>'));
    bodyRow.appendChild(createBodyCell(constants.logta));
    bodyRow.appendChild(createBodyCell(constants.Ta));
  } else if( modelName === "Goldhoff-Sherby") {
    headRow.appendChild(createHeadCell('log(t<sub>a</sub>)'));
    headRow.appendChild(createHeadCell('1/T<sub>a</sub>'));
    bodyRow.appendChild(createBodyCell(constants.logta));
    bodyRow.appendChild(createBodyCell(constants.TaInverse));
  } else if( modelName === "Larson-Miller") {
    headRow.appendChild(createHeadCell('C(t<sub>LM</sub>)'));
    bodyRow.appendChild(createBodyCell(constants.Clm));    
  } else if( modelName === "Orr-Sherby-Dorn") {
    headRow.appendChild(createHeadCell('C(t<sub>OSD</sub>)'));
    bodyRow.appendChild(createBodyCell(constants.Cosd));    
  } else if( modelName === "Manson-Succop") {
    headRow.appendChild(createHeadCell('C(t<sub>MS</sub>)'));
    bodyRow.appendChild(createBodyCell(constants.Cms));    
  } else if( modelName === "Minimum Commitment" || modelName === "Soviet A" || modelName === "Soviet B") {
    for( var i = 0; i < constants.length ; i++) {
      headRow.appendChild(createHeadCell( constantNames[i] ) );
      bodyRow.appendChild( createBodyCell( constants[i] ) );
    }
  }
}
// -- END Classical Model

//-- tr Calculations
function calculateTr( model , s, T) {

  var p = 0;

  if( model.masterCurve !== undefined ) {
    p = model.masterCurve.coefficients[0];

    for (var i = 1; i < model.masterCurve.coefficients.length; i++) {
      p += model.masterCurve.coefficients[i] * Math.pow(Math.log10(s), i);
    }
  }

  if( model.name === "Manson-Haferd" ) {
    return Math.pow(10, p * (T - model.constants.Ta) + model.constants.logta);
  }else if( model.name === "Goldhoff-Sherby" ) {
    return Math.pow(10, p * (1/T - model.constants.TaInverse) + model.constants.logta);
  } else if( model.name === "Larson-Miller" ) {
    return Math.pow(10, p/T - model.constants.Clm);
  } else if( model.name === "Orr-Sherby-Dorn" ) {
    return Math.pow(10, p + model.constants.Cosd/T);
  } else if( model.name === "Manson-Succop" ) {
    return Math.pow(10, p - model.constants.Cms*T);
  } else if( model.name === "Minimum Commitment") {
    p = model.coefficients[0] +
        model.coefficients[1]*Math.log10(s) +
        model.coefficients[2]*s +
        model.coefficients[3]*Math.pow(s,2) + 
        model.coefficients[4]*T +
        model.coefficients[5]/T;
    console.log(p);
    return Math.pow(10,p);
  } else if( model.name === "Soviet A") {
    p = model.coefficients[0] +
        model.coefficients[1]*Math.log10(T) +
        model.coefficients[2]*Math.log10(s) +
        model.coefficients[3]/T + 
        model.coefficients[4]*(s/T);

    return Math.pow(10,p);
  } else if( model.name === "Soviet B") {
    p = model.coefficients[0] +
        model.coefficients[1]*Math.log10(T) +
        model.coefficients[2]*(Math.log10(s)/T) +
        model.coefficients[3]/T + 
        model.coefficients[4]*(s/T);

    return Math.pow(10,p);
  }

  return -1;
}
//-- END tr calculations



// -- Iso-Stress Plots
function plotIsoStress( graphElement, isoStressData, chartTitle ) {
  var data = [];

  if( chartTitle === undefined ) {
    chartTitle = "Time to Rupture vs Temperature";
  }

  for( var s = 0; s < isoStressData.stress.length; s++ ) {
    var x = [];
    var y = [];
    
    var currentStress = isoStressData.stressSorted[s].toFixed(2);    

    var isoStress = isoStressData[currentStress];

    var currentColor = getColor(s);

    //Plot Data Points
    for( var i = 0; i < isoStress.trData.length; i++) {
      x.push( isoStress.TData[i] );
      y.push( isoStress.trData[i] );
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
      x: isoStress.fit.T,
      y: isoStress.fit.tr,
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
      title: 'Time to Rupture (h)',
      type: 'log'
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

    var currentStress = isoStressData.stressSorted[s].toFixed(2);

    var isoStress = isoStressData[currentStress];

    var currentColor = getColor(s);

    for( var i = 0; i < isoStress.TData.length; i++) {
      x.push( 1/isoStress.TData[i]);
      y.push( isoStress.trData[i] );
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
      x: isoStress.fitInverse.T,
      y: isoStress.fitInverse.tr,
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
      title: 'Time to Rupture (h)',
      type: 'log'
    }
  };

  Plotly.newPlot(graphElement, data, layout);
}
// -- END Iso-Stress Plots

// -- Master Curve
function showMasterCurveTable(tableElement, masterCurveData) {
  if (masterCurveData.coefficients) {
    var head = createHead(tableElement);
    var headRow = head.insertRow();

    var body = tableElement.createTBody();
    var bodyRow = body.insertRow();

    for (var i = 65; i < 65 + masterCurveData.coefficients.length; i++) {
      headRow.appendChild(createHeadCell(String.fromCharCode(i)));
      bodyRow.appendChild(createBodyCell(masterCurveData.coefficients[i - 65]));
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
  var xExtended = [];
  var yExtended = [];

  for (var i = 0; i < masterCurveData.trainData.p.length; i++) {
    x.push(masterCurveData.trainData.stress[i]);
    y.push(masterCurveData.trainData.p[i]);
  }

  for (var j = 0; j < masterCurveData.testData.p.length; j++) {
    xFit.push(masterCurveData.testData.stress[j]);
    yFit.push(masterCurveData.testData.p[j]);
  }

  for( var k = 0; k < masterCurveData.testDataExtended.p.length ; k++) {
    xExtended.push(masterCurveData.testDataExtended.stress[k]);
    yExtended.push(masterCurveData.testDataExtended.p[k]);
  }

  var trace = {
    x: x,
    y: y,
    mode: 'markers',
    name: 'Train Parameters',    
    line: { 
      color: getColor(0)
    }
  };

  data.push(trace);

  trace = {
    x: xFit,
    y: yFit,
    mode: 'line',
    name: 'MasterCurve Fit',
    line: { 
      color: getColor(1)
    }
  };

  data.push(trace);

  trace = {
    x: xExtended,
    y: yExtended,
    mode: 'line',
    name: 'MasterCurve',
    line: { 
      color: getColor(2),
      dash: 'dot'
    }
  };

  data.push(trace);

  if( masterCurveData.allParameters != undefined ) {
    var xAll = [];
    var yAll = [];

    for( var s = 0; s < masterCurveData.allParameters.length ; s++) {
      xAll.push( masterCurveData.allStress[s] );
      yAll.push( masterCurveData.allParameters[s] );
    }

    trace = {
      x: xAll,
      y: yAll,
      mode: 'markers',
      name: 'All Parameters',
      line: { 
        color: "#F80210"
      },
      marker: {
        symbol: 'x-thin-open'
      }
    };

    data.push(trace);
  }

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
    y.push(constT.tr[i]); //TODO Fix this
  }

  var trace = {
    x: x,
    y: y,
    mode: 'line',
    name: constT.T + ' °C',
    line: { 
      color: getColor(0)
    }
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
    x.push(constStress.T[i]);
    y.push(constStress.tr[i]);
  }

  var trace = {
    x: x,
    y: y,
    mode: 'line',
    name: constStress.stress + ' MPa',
    line: { 
      color: getColor(0)
    }
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

// -- Excel Export
function excelAddStressTest( excel, stressTest, currentSheet , headStyle, bodyStyle ) {
  excel.addSheet('Stress Test');
  excel.set(currentSheet+1, 0, 0, 'tr (h)', headStyle);
  excel.set(currentSheet+1, 1, 0, 'Temperature (°C)', headStyle);
  excel.set(currentSheet+1, 2, 0, 'Stress (MPa)', headStyle);
  excel.set(currentSheet+1, 3, 0, 'Stress Predicted (MPa)', headStyle);
  excel.set(currentSheet+1, 4, 0, 'Error (h)', headStyle);
  excel.set(currentSheet+1, 5, 0, '|Error| (%)', headStyle);

  var nTr = stressTest.tr.length;
  var nT = stressTest.T.length;

  for (var a = 0; a < nTr; a++) {
    for (var b = 0; b < nT; b++) {
      excel.set(currentSheet+1, 0, 1 + a * nT + b, stressTest.tr[a], bodyStyle);
      excel.set(currentSheet+1, 1, 1 + a * nT + b, stressTest.T[b], bodyStyle);
      excel.set(currentSheet+1, 2, 1 + a * nT + b, stressTest.stressActual[b][a], bodyStyle);
      excel.set(currentSheet+1, 3, 1 + a * nT + b, stressTest.stressPredicted[b][a], bodyStyle);
      excel.set(currentSheet+1, 4, 1 + a * nT + b, stressTest.errors.difference[b][a], bodyStyle);
      excel.set(currentSheet+1, 5, 1 + a * nT + b, stressTest.errors.percentage[b][a], bodyStyle);
    }
  }
}

function excelAddTrTest( excel, trTest, currentSheet, headStyle, bodyStyle ) {
  excel.addSheet('tr Test', headStyle);
  excel.set(currentSheet+1, 0, 0, 'Temperature (°C)', headStyle);
  excel.set(currentSheet+1, 1, 0, 'Stress (MPa)', headStyle);
  excel.set(currentSheet+1, 2, 0, 'tr (h)', headStyle);
  excel.set(currentSheet+1, 3, 0, 'tr Predicted (h)', headStyle);
  excel.set(currentSheet+1, 4, 0, 'Error (h)', headStyle);
  excel.set(currentSheet+1, 5, 0, '|Error| (%)', headStyle);

  for (var k = 0; k < trTest.T.length; k++) {
    excel.set(currentSheet+1, 0, 1 + k, trTest.T[k], bodyStyle);
    excel.set(currentSheet+1, 1, 1 + k, trTest.stress[k], bodyStyle);
    excel.set(currentSheet+1, 2, 1 + k, trTest.trActual[k], bodyStyle);
    excel.set(currentSheet+1, 3, 1 + k, trTest.trPredicted[k], bodyStyle);
    excel.set(currentSheet+1, 4, 1 + k, trTest.errors.difference[k], bodyStyle);
    excel.set(currentSheet+1, 5, 1 + k, Math.abs(trTest.errors.percentage[k]), bodyStyle);
  }
}

function excelAddModel( excel, model, headStyle, bodyStyle) {
  excel.set({ sheet: 0, value: model.name });
  excel.set(0,0,0, model.material + ' ' + model.name + ' Model', headStyle);

  var offset = 0;

  if( model.name === "Manson-Haferd" ) {
    excel.set(0, 0, 1, 'log(ta)', bodyStyle);
    excel.set(0, 1, 1, model.constants.logta, bodyStyle);

    excel.set(0, 0, 2, 'Ta', bodyStyle);
    excel.set(0, 1, 2, model.constants.Ta, bodyStyle);    
    offset = 3;
  } else if( model.name === "Goldhoff-Sherby") {
    excel.set(0, 0, 1, 'log(ta)', bodyStyle);
    excel.set(0, 1, 1, model.constants.logta, bodyStyle);

    excel.set(0, 0, 2, '1/Ta', bodyStyle);
    excel.set(0, 1, 2, model.constants.TaInverse, bodyStyle);    
    offset = 3;
  } else if( model.name === "Larson-Miller" ) {
    excel.set(0, 0, 1, 'Clm', bodyStyle);
    excel.set(0, 1, 1, model.constants.Clm, bodyStyle);

    offset = 2;
  } else if( model.name === "Orr-Sherby-Dorn" ) {
    excel.set(0, 0, 1, 'Cosd', bodyStyle);
    excel.set(0, 1, 1, model.constants.Cosd, bodyStyle);

    offset = 2;
  } else if( model.name === "Manson-Succop" ) {
    excel.set(0, 0, 1, 'Cms', bodyStyle);
    excel.set(0, 1, 1, model.constants.Cms, bodyStyle);

    offset = 2;
  }

  if( model.masterCurve !== undefined ) {
    var coeffLabels = [ 'A','B','C','D','E' ];

    excel.set(0,0,offset++, 'MasterCurve Coefficients', headStyle);

    for( var i = 0; i < model.masterCurve.coefficients.length; i++ ) {
      excel.set(0,0,offset + i, coeffLabels[i], bodyStyle );
      excel.set(0,1,offset + i, model.masterCurve.coefficients[i], bodyStyle );
    }

    offset += coeffLabels.length;

    if( model.masterCurve.allParameters === undefined ) {
      excel.set(0,0,offset, 'Fitted to whole dataset', headStyle);
    } else {
      excel.set(0,0,offset, 'Fitted only to iso-stress parameters', headStyle );
    }
  }

  if( model.coefficients !== undefined ) {
    var coeffLabels = ['a','b','c','d','f','g'];

    offset = 1;

    for( var i = 0; i < model.coefficients.length ; i++ ) {
      excel.set(0, 0, offset + i, coeffLabels[i] );
      excel.set(0, 1, offset + i, model.coefficients[i] );
    }

    offset += model.coefficients.length-1;
  }
  
  var modelEquations = { 
    'Manson-Haferd': {
      p: '=$B$5+$B$6*(LOG10(A14))+$B$7*(LOG10(A14))^2+$B$8*(LOG10(A14))^3+$B$9*(LOG10(A14))^4',
      tr: '=10^(D14*(C14-$B$3)+$B$2)'
    },
    'Goldhoff-Sherby': {
      p: '=$B$5+$B$6*(LOG10(A14))+$B$7*(LOG10(A14))^2+$B$8*(LOG10(A14))^3+$B$9*(LOG10(A14))^4',
      tr: '=10^(D14*(1/C14-$B$3)+$B$2)'
    },
    'Larson-Miller': {
      p: '=$B$4+$B$5*(LOG10(A13))+$B$6*(LOG10(A13))^2+$B$7*(LOG10(A13))^3+$B$8*(LOG10(A13))^4',
      tr: '=10^(D13/C13-$B$2)'
    },
    'Orr-Sherby-Dorn': {
      p: '=$B$4+$B$5*(LOG10(A13))+$B$6*(LOG10(A13))^2+$B$7*(LOG10(A13))^3+$B$8*(LOG10(A13))^4',
      tr: '=10^(D13+$B$2/C13)'
    },
    'Manson-Succop': {
      p: '=$B$4+$B$5*(LOG10(A13))+$B$6*(LOG10(A13))^2+$B$7*(LOG10(A13))^3+$B$8*(LOG10(A13))^4',
      tr: '=10^(D13-$B$2*C13)'
    },
    'Minimum Commitment': {
      tr: '=10^($B$2+$B$3*LOG10(A11)+$B$4*A11+$B$5*(A11^2)+$B$6*C11+$B$7/C11)'
    },
    'Soviet A': {
      tr: '=10^($B$2+$B$3*LOG10(C10)+$B$4*LOG10(A10)+$B$5/C10+$B$6*(A10/C10))'
    },
    'Soviet B': {
      tr: '=10^($B$2+$B$3*LOG10(C10)+$B$4*(LOG10(A10)/C10)+$B$5/C10+$B$6*(A10/C10))'
    }
  }

  var calculatorLabels;
  
  if( model.coefficients === undefined)
    calculatorLabels = ['Stress (MPa)', 'Temperature (degC)', 'Temperature (K)', 'P(stress)', 'tr'];
  else
    calculatorLabels = ['Stress (MPa)', 'Temperature (degC)', 'Temperature (K)', 'tr'];

  offset += 2;
  excel.set(0, 0, offset++, 'Calculator', headStyle);

  for (var i = 0; i < calculatorLabels.length; i++) {
    excel.set(0, i, offset, calculatorLabels[i], bodyStyle);
  }

  offset++;

  excel.set(0,0,offset, "0" , bodyStyle );
  excel.set(0,1,offset, "0" , bodyStyle );
  excel.set(0,2,offset, "=B" + (offset+1) + "+273.15" , bodyStyle );

  if( model.coefficients === undefined ) {
    excel.set(0,3,offset, modelEquations[model.name].p , bodyStyle);
    excel.set(0,4,offset, modelEquations[model.name].tr , bodyStyle);
  } else {
    excel.set(0,3,offset, modelEquations[model.name].tr , bodyStyle);
  }
}
// -- END Excel Export

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