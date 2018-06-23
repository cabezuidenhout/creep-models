var lmInfo = JSON.parse(data);

setTitle( document.getElementById('pageTitle'), lmInfo.material + ' ' + lmInfo.model + ' Model');
showParametersTable( document.getElementById('paramaterTable') );
showMasterCuveTable( document.getElementById('mastercurveTable') , lmInfo.masterCurve ); 

plotIsoStress(document.getElementById('isoStressPlot'), lmInfo.isoStress, lmInfo.material + " Iso-Stress (±" + lmInfo.isoStress.tolerance + "MPa)");
plotMasterCurve(document.getElementById('masterCurvePlot'), lmInfo.masterCurve, lmInfo.material + " " + lmInfo.model + " Mastercuve");

showStressTestTable(document.getElementById('stressTest'), lmInfo.stressTest, document.getElementById('stressTestWarning'));
showTestSummaryTable(document.getElementById('stressTestSummary'), lmInfo.stressTest, 'MPa');

showTrTestTable(document.getElementById('trTest'), lmInfo.trTest, document.getElementById('trTestWarning'));
showTestSummaryTable(document.getElementById('trTestSummary'), lmInfo.trTest, 'h');

plotConstantStress(document.getElementById('constStressPlot'), lmInfo.constStress);
plotConstantTemperature(document.getElementById('constTPlot'), lmInfo.constT);

function showParametersTable( tableElement ) {
  var head = createHead(tableElement);
  var headRow = head.insertRow();

  headRow.appendChild(createHeadCell('C(t<sub>LM</sub>)'));  

  var body = tableElement.createTBody();
  var bodyRow = body.insertRow();

  bodyRow.appendChild(createBodyCell(lmInfo.Clm));
}

document.getElementById('calculateButton').onclick = function (e) {
  e.preventDefault();

  var stress = Number(document.getElementById('stressInput').value);
  var T = Number(document.getElementById('temperatureInput').value) + 273.15;

  var p = lmInfo.masterCurve.coefficients[0];

  for (var i = 1; i < lmInfo.masterCurve.coefficients.length; i++) {
    p += lmInfo.masterCurve.coefficients[i] * Math.pow(Math.log10(stress), i);
  }

  var t = Math.pow(10, (p/T)-lmInfo.Clm);

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
  excel.set({ sheet: 0, value: "Manson-Haferd" });
  excel.set(0, 0, 0, lmInfo.material + " Manson-Haferd Model", headStyle);
  

  excel.set(0, 0, 1, 'Clm', defaultStyle);
  excel.set(0, 1, 1, lmInfo.Clm, defaultStyle);

  excel.set(0, 0, 2, 'Mastercuve Coefficients', headStyle);
  excel.set(0, 0, 3, 'A', defaultStyle);
  excel.set(0, 0, 4, 'B', defaultStyle);
  excel.set(0, 0, 5, 'C', defaultStyle);
  excel.set(0, 0, 6, 'D', defaultStyle);
  excel.set(0, 0, 7, 'E', defaultStyle);

  var offset = 3;

  for (var i = 0; i < lmInfo.masterCurve.coefficients.length; i++) {
    excel.set(0, 1, offset + i, lmInfo.masterCurve.coefficients[i], defaultStyle);
  }

  excelAddStressTest( excel, lmInfo.stressTest, 0, headStyle, defaultStyle );
  excelAddTrTest( excel, lmInfo.trTest, 1, headStyle, defaultStyle );
  excel.generate(lmInfo.material + '_' + new Date().toISOString().substring(0, 10) + '_LM.xlsx');
}

window.onresize = function () {
  Plotly.Plots.resize(masterCurvePlot);
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(constStressPlot);
  Plotly.Plots.resize(constTPlot);
};