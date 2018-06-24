var osdInfo = JSON.parse(data);

setTitle( document.getElementById('pageTitle'), osdInfo.material + ' ' + osdInfo.model + ' Model');
showParametersTable( document.getElementById('paramaterTable') );
showMasterCuveTable( document.getElementById('mastercurveTable') , osdInfo.masterCurve ); 

plotIsoStressInverse(document.getElementById('isoStressPlot'), osdInfo.isoStress, osdInfo.material + " Iso-Stress (±" + osdInfo.isoStress.tolerance + "MPa)");
plotMasterCurve(document.getElementById('masterCurvePlot'), osdInfo.masterCurve, osdInfo.material + " " + osdInfo.model + " Mastercurve");

showStressTestTable(document.getElementById('stressTest'), osdInfo.stressTest, document.getElementById('stressTestWarning'));
showTestSummaryTable(document.getElementById('stressTestSummary'), osdInfo.stressTest, 'MPa');

showTrTestTable(document.getElementById('trTest'), osdInfo.trTest, document.getElementById('trTestWarning'));
showTestSummaryTable(document.getElementById('trTestSummary'), osdInfo.trTest, 'h');

plotConstantStress(document.getElementById('constStressPlot'), osdInfo.constStress);
plotConstantTemperature(document.getElementById('constTPlot'), osdInfo.constT);

function showParametersTable( tableElement ) {
  var head = createHead(tableElement);
  var headRow = head.insertRow();

  headRow.appendChild(createHeadCell('C<sub>OSD</sub>'));  

  var body = tableElement.createTBody();
  var bodyRow = body.insertRow();

  bodyRow.appendChild(createBodyCell(osdInfo.Cosd));
}

document.getElementById('calculateButton').onclick = function (e) {
  e.preventDefault();

  var stress = Number(document.getElementById('stressInput').value);
  var T = Number(document.getElementById('temperatureInput').value) + 273.15;

  var p = osdInfo.masterCurve.coefficients[0];

  for (var i = 1; i < osdInfo.masterCurve.coefficients.length; i++) {
    p += osdInfo.masterCurve.coefficients[i] * Math.pow(Math.log10(stress), i);
  }

  var t = Math.pow(10, (p+osdInfo.Cosd/T));

  document.getElementById('calculatedTr').innerText = t.toFixed(0);
}

document.getElementById('excelExportButton').onclick = exportToExcel;

function exportToExcel() {
  var excel = $JExcel.new('Calibri 11 #333333');
  var headStyle = excel.addStyle({
    font: "Calibri 12 #000000 B"
  });

  var defaultStyle = excel.addStyle({
    border: "thin,thin,thin,thin #000000",
    font: "Calibri 12 #000000"
  });


  //---------- Model Parammeters Sheet ---------------------------
  excel.set({ sheet: 0, value: "Orr-Sherby-Dorn" });
  excel.set(0, 0, 0, osdInfo.material + " Orr-Sherby-Dorn Model", headStyle);
  

  excel.set(0, 0, 1, 'Cosd', defaultStyle);
  excel.set(0, 1, 1, osdInfo.Cms, defaultStyle);

  excel.set(0, 0, 2, 'Mastercuve Coefficients', headStyle);
  excel.set(0, 0, 3, 'A', defaultStyle);
  excel.set(0, 0, 4, 'B', defaultStyle);
  excel.set(0, 0, 5, 'C', defaultStyle);
  excel.set(0, 0, 6, 'D', defaultStyle);
  excel.set(0, 0, 7, 'E', defaultStyle);

  var offset = 3;

  for (var i = 0; i < osdInfo.masterCurve.coefficients.length; i++) {
    excel.set(0, 1, offset + i, osdInfo.masterCurve.coefficients[i], defaultStyle);
  }

  excelAddStressTest( excel, osdInfo.stressTest, 0, headStyle, defaultStyle );
  excelAddTrTest( excel, osdInfo.trTest, 1, headStyle, defaultStyle );
  excel.generate(osdInfo.material + '_' + new Date().toISOString().substring(0, 10) + '_OSD.xlsx');
}

window.onresize = function () {
  Plotly.Plots.resize(masterCurvePlot);
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(constStressPlot);
  Plotly.Plots.resize(constTPlot);
};