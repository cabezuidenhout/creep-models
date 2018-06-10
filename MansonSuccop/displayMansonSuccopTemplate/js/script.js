const msData = JSON.parse(data);

setTitle(document.getElementById('pageTitle'), msData.material + ' Manson-Succop Model');
populateMansonSuccopTable(document.getElementById('msParameterTable'));
populateMasterCuveTable(document.getElementById('mastercurveCoefficientTable'), msData.masterCurve.coefficients);
plotIsoStress(document.getElementById('isoStressPlot'), msData.isoStressData);
plotMasterCurve(document.getElementById('masterCurvePlot'), msData.masterCurve);
populateStressPredictionTable(document.getElementById('stressPredictionTest'), msData.stressTest);
populateTestSummaryTable(document.getElementById('stressTestSummary'), msData.stressTest, 'MPa');
populateTrPredictionTable(document.getElementById('trPredictionTest'), msData.trTest);
populateTestSummaryTable(document.getElementById('trTestSummary'), msData.trTest, 'h');
plotConstantTemperature(document.getElementById('constantTemperaturePlot'), msData.constT);
plotConstantStress(document.getElementById('constantStressPlot'), msData.constStress);

function populateMansonSuccopTable(tableElement) {
  const head = createHead(tableElement);
  const headRow = head.insertRow();

  headRow.appendChild(createHeadCell('C<sub>MS</sub>'));

  const body = tableElement.createTBody();
  const bodyRow = body.insertRow();
  bodyRow.appendChild(createBodyCell(msData.Cms));
}

function exportToExcel() {
  const excel = $JExcel.new('Calibri 11 #333333');
  const headStyle = excel.addStyle({
    font: "Calibri 12 #000000 B"
  });

  const defaultStyle = excel.addStyle({
    border: "thin,thin,thin,thin #000000",
    font: "Calibri 12 #000000"
  });

  //---------- Model Parammeters Sheet ---------------------------
  excel.set({ sheet: 0, value: "Manson-Succop" });
  excel.set(0, 0, 0, msData.material + " Manson-Succop Model", headStyle);

  excel.set(0, 0, 1, 'Cms', defaultStyle);
  excel.set(0, 1, 1, msData.Cms, defaultStyle);

  excel.set(0, 0, 2, 'Mastercuve Coefficients', headStyle);
  excel.set(0, 0, 3, 'A', defaultStyle);
  excel.set(0, 0, 4, 'B', defaultStyle);
  excel.set(0, 0, 5, 'C', defaultStyle);
  excel.set(0, 0, 6, 'D', defaultStyle);
  excel.set(0, 0, 7, 'E', defaultStyle);

  for (var i = 0; i < msData.masterCurve.coefficients.length; i++) {
    excel.set(0, 1, 3 + i, msData.masterCurve.coefficients[i], defaultStyle);
  }

  //---------- Stress Sheet ---------------------------
  excel.addSheet('Stress Test');
  excel.set(1, 0, 0, 'tr (h)', headStyle);
  excel.set(1, 1, 0, 'Temperature (°C)', headStyle);
  excel.set(1, 2, 0, 'Stress (MPa)', headStyle);
  excel.set(1, 3, 0, 'Stress Predicted (MPa)', headStyle);
  excel.set(1, 4, 0, 'Error (h)', headStyle);
  excel.set(1, 5, 0, '|Error| (%)', headStyle);

  var nTr = msData.stressTest.tr.length;
  var nT = msData.stressTest.T.length;

  for (var a = 0; a < nTr; a++) {
    for (var b = 0; b < nT; b++) {
      excel.set(1, 0, 1 + a * nT + b, msData.stressTest.tr[a], defaultStyle);
      excel.set(1, 1, 1 + a * nT + b, msData.stressTest.T[b], defaultStyle);
      excel.set(1, 2, 1 + a * nT + b, msData.stressTest.stressActual[b][a], defaultStyle);
      excel.set(1, 3, 1 + a * nT + b, msData.stressTest.stressPredicted[b][a], defaultStyle);
      excel.set(1, 4, 1 + a * nT + b, msData.stressTest.errors.Err[a][b], defaultStyle);
      excel.set(1, 5, 1 + a * nT + b, msData.stressTest.errors.Percentage[b][a], defaultStyle);
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

  for (var k = 0; k < msData.trTest.T.length; k++) {
    excel.set(2, 0, 1 + k, msData.trTest.T[k], defaultStyle);
    excel.set(2, 1, 1 + k, msData.trTest.stress[k], defaultStyle);
    excel.set(2, 2, 1 + k, msData.trTest.trActual[k], defaultStyle);
    excel.set(2, 3, 1 + k, msData.trTest.trPredicted[k], defaultStyle);
    excel.set(2, 4, 1 + k, msData.trTest.errors.Err[k], defaultStyle);
    excel.set(2, 5, 1 + k, Math.abs(msData.trTest.errors.Percentage[k]), defaultStyle);
  }

  excel.generate(msData.material + '_' + new Date().toISOString().substring(0, 10) + '_MS.xlsx');
}

document.getElementById('exportExcelButton').onclick = exportToExcel;

window.onresize = function () {
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(masterCurvePlot);
  Plotly.Plots.resize(constantTemperaturePlot);
  Plotly.Plots.resize(constantStressPlot);
};