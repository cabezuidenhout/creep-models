'use strict';

var mhData = JSON.parse(data);

setTitle(document.getElementById('pageTitle'), mhData.material + ' Manson-Haferd Model');
populateMansonHaferdTable(document.getElementById('mhParameterTable'));
populateMasterCuveTable(document.getElementById('mastercurveCoefficientTable'), mhData.masterCurve.coefficients);
plotIsoStress(document.getElementById('isoStressPlot'), mhData.isoStressData);
plotMasterCurve(document.getElementById('masterCurvePlot'), mhData.masterCurve);
populateStressPredictionTable(document.getElementById('stressPredictionTest'), mhData.stressTest);
populateTestSummaryTable(document.getElementById('stressTestSummary'), mhData.stressTest);
populateTrPredictionTable(document.getElementById('trPredictionTest'), mhData.trTest);
populateTestSummaryTable(document.getElementById('trTestSummary'), mhData.trTest);
plotConstantTemperature(document.getElementById('constantTemperaturePlot'), mhData.constT);
plotConstantStress(document.getElementById('constantStressPlot'), mhData.constStress);

function populateMansonHaferdTable(tableElement) {
  var head = createHead(tableElement);
  var headRow = head.insertRow();

  headRow.appendChild(createHeadCell('log(t<sub>a</sub>)'));
  headRow.appendChild(createHeadCell('T<sub>a</sub>'));

  var body = tableElement.createTBody();
  var bodyRow = body.insertRow();

  bodyRow.appendChild(createBodyCell(mhData.logta));
  bodyRow.appendChild(createBodyCell(mhData.Ta));
}

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
  excel.set(0, 0, 0, mhData.material + " Manson-Haferd Model", headStyle);

  excel.set(0, 0, 1, 'log(ta)', defaultStyle);
  excel.set(0, 1, 1, mhData.logta, defaultStyle);

  excel.set(0, 0, 2, 'Ta', defaultStyle);
  excel.set(0, 1, 2, mhData.Ta, defaultStyle);

  excel.set(0, 0, 3, 'Mastercuve Coefficients', headStyle);
  excel.set(0, 0, 4, 'A', defaultStyle);
  excel.set(0, 0, 5, 'B', defaultStyle);
  excel.set(0, 0, 6, 'C', defaultStyle);
  excel.set(0, 0, 7, 'D', defaultStyle);
  excel.set(0, 0, 8, 'E', defaultStyle);

  for (var i = 0; i < mhData.masterCurve.coefficients.length; i++) {
    excel.set(0, 1, 4 + i, mhData.masterCurve.coefficients[i], defaultStyle);
  }

  //---------- Stress Sheet ---------------------------
  excel.addSheet('Stress Test');
  excel.set(1, 0, 0, 'tr (h)', headStyle);
  excel.set(1, 1, 0, 'Temperature (°C)', headStyle);
  excel.set(1, 2, 0, 'Stress (MPa)', headStyle);
  excel.set(1, 3, 0, 'Stress Predicted (MPa)', headStyle);
  excel.set(1, 4, 0, 'Error (h)', headStyle);
  excel.set(1, 5, 0, '|Error| (%)', headStyle);

  var nTr = mhData.stressTest.tr.length;
  var nT = mhData.stressTest.T.length;

  for (var a = 0; a < nTr; a++) {
    for (var b = 0; b < nT; b++) {
      excel.set(1, 0, 1 + a * nT + b, mhData.stressTest.tr[a], defaultStyle);
      excel.set(1, 1, 1 + a * nT + b, mhData.stressTest.T[b], defaultStyle);
      excel.set(1, 2, 1 + a * nT + b, mhData.stressTest.stressActual[b][a], defaultStyle);
      excel.set(1, 3, 1 + a * nT + b, mhData.stressTest.stressPredicted[b][a], defaultStyle);
      excel.set(1, 4, 1 + a * nT + b, mhData.stressTest.errors.Err[a][b], defaultStyle);
      excel.set(1, 5, 1 + a * nT + b, mhData.stressTest.errors.Percentage[b][a], defaultStyle);
    }
  }

  //---------- Tr Sheet ---------------------------
  excel.addSheet('tr Test', headStyle);
  excel.set(2, 0, 0, 'Temperature (°C)', headStyle);
  excel.set(2, 1, 0, 'Stress (MPa)', headStyle);
  excel.set(2, 2, 0, 'tr (h)', headStyle);
  excel.set(2, 3, 0, 'tr Predicted (h)', headStyle);
  excel.set(2, 4, 0, 'Error (h)', headStyle);
  excel.set(2, 5, 0, '|Error| (%)', headStyle);

  for (var k = 0; k < mhData.trTest.T.length; k++) {
    excel.set(2, 0, 1 + k, mhData.trTest.T[k], defaultStyle);
    excel.set(2, 1, 1 + k, mhData.trTest.stress[k], defaultStyle);
    excel.set(2, 2, 1 + k, mhData.trTest.trActual[k], defaultStyle);
    excel.set(2, 3, 1 + k, mhData.trTest.trPredicted[k], defaultStyle);
    excel.set(2, 4, 1 + k, mhData.trTest.errors.Err[k], defaultStyle);
    excel.set(2, 5, 1 + k, Math.abs(mhData.trTest.errors.Percentage[k]), defaultStyle);
  }

  excel.generate(mhData.material + '_' + new Date().toISOString().substring(0, 10) + '_MH.xlsx');
}

document.getElementById('exportExcelButton').onclick = exportToExcel;

window.onresize = function () {
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(masterCurvePlot);
  Plotly.Plots.resize(constantTemperaturePlot);
  Plotly.Plots.resize(constantStressPlot);
};
