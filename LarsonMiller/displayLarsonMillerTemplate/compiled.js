'use strict';

var lmData = JSON.parse(data);

setTitle(document.getElementById('pageTitle'), lmData.material + ' Larson-Miller Model');
populateLarsonMillerTable(document.getElementById('lmParameterTable'));
populateMasterCuveTable(document.getElementById('mastercurveCoefficientTable'), lmData.masterCurve.coefficients);
plotIsoStressInverse(document.getElementById('isoStressPlot'), lmData.isoStressData);
plotMasterCurve(document.getElementById('masterCurvePlot'), lmData.masterCurve);
populateStressPredictionTable(document.getElementById('stressPredictionTest'), lmData.stressTest);
populateTestSummaryTable(document.getElementById('stressTestSummary'), lmData.stressTest, 'MPa');
populateTrPredictionTable(document.getElementById('trPredictionTest'), lmData.trTest);
populateTestSummaryTable(document.getElementById('trTestSummary'), lmData.trTest, 'h');
plotConstantTemperature(document.getElementById('constantTemperaturePlot'), lmData.constT);
plotConstantStress(document.getElementById('constantStressPlot'), lmData.constStress);

function populateLarsonMillerTable(tableElement) {
  var head = createHead(tableElement);
  var headRow = head.insertRow();

  headRow.appendChild(createHeadCell('C<sub>lm</sub>'));

  var body = tableElement.createTBody();
  var bodyRow = body.insertRow();
  bodyRow.appendChild(createBodyCell(lmData.Clm));
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
  excel.set({ sheet: 0, value: "Larson-Miller" });
  excel.set(0, 0, 0, lmData.material + " Larson-Miller Model", headStyle);

  excel.set(0, 0, 1, 'Clm', defaultStyle);
  excel.set(0, 1, 1, lmData.Clm, defaultStyle);

  excel.set(0, 0, 2, 'Mastercuve Coefficients', headStyle);
  excel.set(0, 0, 3, 'A', defaultStyle);
  excel.set(0, 0, 4, 'B', defaultStyle);
  excel.set(0, 0, 5, 'C', defaultStyle);
  excel.set(0, 0, 6, 'D', defaultStyle);
  excel.set(0, 0, 7, 'E', defaultStyle);

  for (var i = 0; i < lmData.masterCurve.coefficients.length; i++) {
    excel.set(0, 1, 3 + i, lmData.masterCurve.coefficients[i], defaultStyle);
  }

  //---------- Stress Sheet ---------------------------
  excel.addSheet('Stress Test');
  excel.set(1, 0, 0, 'tr (h)', headStyle);
  excel.set(1, 1, 0, 'Temperature (°C)', headStyle);
  excel.set(1, 2, 0, 'Stress (MPa)', headStyle);
  excel.set(1, 3, 0, 'Stress Predicted (MPa)', headStyle);
  excel.set(1, 4, 0, 'Error (h)', headStyle);
  excel.set(1, 5, 0, '|Error| (%)', headStyle);

  var nTr = lmData.stressTest.tr.length;
  var nT = lmData.stressTest.T.length;

  for (var a = 0; a < nTr; a++) {
    for (var b = 0; b < nT; b++) {
      excel.set(1, 0, 1 + a * nT + b, lmData.stressTest.tr[a], defaultStyle);
      excel.set(1, 1, 1 + a * nT + b, lmData.stressTest.T[b], defaultStyle);
      excel.set(1, 2, 1 + a * nT + b, lmData.stressTest.stressActual[b][a], defaultStyle);
      excel.set(1, 3, 1 + a * nT + b, lmData.stressTest.stressPredicted[b][a], defaultStyle);
      excel.set(1, 4, 1 + a * nT + b, lmData.stressTest.errors.Err[a][b], defaultStyle);
      excel.set(1, 5, 1 + a * nT + b, lmData.stressTest.errors.Percentage[b][a], defaultStyle);
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

  for (var k = 0; k < lmData.trTest.T.length; k++) {
    excel.set(2, 0, 1 + k, lmData.trTest.T[k], defaultStyle);
    excel.set(2, 1, 1 + k, lmData.trTest.stress[k], defaultStyle);
    excel.set(2, 2, 1 + k, lmData.trTest.trActual[k], defaultStyle);
    excel.set(2, 3, 1 + k, lmData.trTest.trPredicted[k], defaultStyle);
    excel.set(2, 4, 1 + k, lmData.trTest.errors.Err[k], defaultStyle);
    excel.set(2, 5, 1 + k, Math.abs(lmData.trTest.errors.Percentage[k]), defaultStyle);
  }

  excel.generate(lmData.material + '_' + new Date().toISOString().substring(0, 10) + '_LM.xlsx');
}

document.getElementById('exportExcelButton').onclick = exportToExcel;

window.onresize = function () {
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(masterCurvePlot);
  Plotly.Plots.resize(constantTemperaturePlot);
  Plotly.Plots.resize(constantStressPlot);
};
