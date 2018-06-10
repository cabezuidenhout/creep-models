var osdData = JSON.parse(data);

setTitle(document.getElementById('pageTitle'), osdData.material + ' Orr-Sherby-Dorn Model');
populateOrrSherbyDornTable(document.getElementById('osdParameterTable'));
populateMasterCuveTable(document.getElementById('mastercurveCoefficientTable'), osdData.masterCurve.coefficients);
plotIsoStressInverse(document.getElementById('isoStressPlot'), osdData.isoStressData);
plotMasterCurve(document.getElementById('masterCurvePlot'), osdData.masterCurve);
populateStressPredictionTable(document.getElementById('stressPredictionTest'), osdData.stressTest);
populateTestSummaryTable(document.getElementById('stressTestSummary'), osdData.stressTest, 'MPa');
populateTrPredictionTable(document.getElementById('trPredictionTest'), osdData.trTest);
populateTestSummaryTable(document.getElementById('trTestSummary'), osdData.trTest, 'h');
plotConstantTemperature(document.getElementById('constantTemperaturePlot'), osdData.constT);
plotConstantStress(document.getElementById('constantStressPlot'), osdData.constStress);

function populateOrrSherbyDornTable(tableElement) {
  const head = createHead(tableElement);
  const headRow = head.insertRow();

  headRow.appendChild(createHeadCell('C<sub>osd</sub>'));

  const body = tableElement.createTBody();
  const bodyRow = body.insertRow();
  bodyRow.appendChild(createBodyCell(osdData.Cosd));
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
  excel.set({ sheet: 0, value: "Orr-Sherby-Dorn" });
  excel.set(0, 0, 0, osdData.material + " Orr-Sherby-Dorn Model", headStyle);

  excel.set(0, 0, 1, 'Cosd', defaultStyle);
  excel.set(0, 1, 1, osdData.Cosd, defaultStyle);

  excel.set(0, 0, 2, 'Mastercuve Coefficients', headStyle);
  excel.set(0, 0, 3, 'A', defaultStyle);
  excel.set(0, 0, 4, 'B', defaultStyle);
  excel.set(0, 0, 5, 'C', defaultStyle);
  excel.set(0, 0, 6, 'D', defaultStyle);
  excel.set(0, 0, 7, 'E', defaultStyle);

  for (let i = 0; i < osdData.masterCurve.coefficients.length; i++) {
    excel.set(0, 1, 3 + i, osdData.masterCurve.coefficients[i], defaultStyle);
  }

  //---------- Stress Sheet ---------------------------
  excel.addSheet('Stress Test');
  excel.set(1, 0, 0, 'tr (h)', headStyle);
  excel.set(1, 1, 0, 'Temperature (°C)', headStyle);
  excel.set(1, 2, 0, 'Stress (MPa)', headStyle);
  excel.set(1, 3, 0, 'Stress Predicted (MPa)', headStyle);
  excel.set(1, 4, 0, 'Error (h)', headStyle);
  excel.set(1, 5, 0, '|Error| (%)', headStyle);

  let nTr = osdData.stressTest.tr.length;
  let nT = osdData.stressTest.T.length;

  for (let a = 0; a < nTr; a++) {
    for (let b = 0; b < nT; b++) {
      excel.set(1, 0, 1 + a * nT + b, osdData.stressTest.tr[a], defaultStyle);
      excel.set(1, 1, 1 + a * nT + b, osdData.stressTest.T[b], defaultStyle);
      excel.set(1, 2, 1 + a * nT + b, osdData.stressTest.stressActual[b][a], defaultStyle);
      excel.set(1, 3, 1 + a * nT + b, osdData.stressTest.stressPredicted[b][a], defaultStyle);
      excel.set(1, 4, 1 + a * nT + b, osdData.stressTest.errors.Err[a][b], defaultStyle);
      excel.set(1, 5, 1 + a * nT + b, osdData.stressTest.errors.Percentage[b][a], defaultStyle);
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

  for (let k = 0; k < osdData.trTest.T.length; k++) {
    excel.set(2, 0, 1 + k, osdData.trTest.T[k], defaultStyle);
    excel.set(2, 1, 1 + k, osdData.trTest.stress[k], defaultStyle);
    excel.set(2, 2, 1 + k, osdData.trTest.trActual[k], defaultStyle);
    excel.set(2, 3, 1 + k, osdData.trTest.trPredicted[k], defaultStyle);
    excel.set(2, 4, 1 + k, osdData.trTest.errors.Err[k], defaultStyle);
    excel.set(2, 5, 1 + k, Math.abs(osdData.trTest.errors.Percentage[k]), defaultStyle);
  }

  excel.generate(osdData.material + '_' + new Date().toISOString().substring(0, 10) + '_OSD.xlsx');
}

document.getElementById('exportExcelButton').onclick = exportToExcel;

window.onresize = function () {
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(masterCurvePlot);
  Plotly.Plots.resize(constantTemperaturePlot);
  Plotly.Plots.resize(constantStressPlot);
};