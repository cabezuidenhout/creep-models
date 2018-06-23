var msInfo = JSON.parse(data);

setTitle( document.getElementById('pageTitle'), msInfo.material + ' ' + msInfo.model + ' Model');
showParametersTable( document.getElementById('paramaterTable') );
showMasterCuveTable( document.getElementById('mastercurveTable') , msInfo.masterCurve ); 

plotIsoStress(document.getElementById('isoStressPlot'), msInfo.isoStress, msInfo.material + " Iso-Stress (±" + msInfo.isoStress.tolerance + "MPa)");
plotMasterCurve(document.getElementById('masterCurvePlot'), msInfo.masterCurve, msInfo.material + " " + msInfo.model + " Mastercurve");

// showStressTestTable(document.getElementById('stressTest'), msInfo.stressTest, document.getElementById('stressTestWarning'));
// showTestSummaryTable(document.getElementById('stressTestSummary'), msInfo.stressTest, 'MPa');

// showTrTestTable(document.getElementById('trTest'), msInfo.trTest, document.getElementById('trTestWarning'));
// showTestSummaryTable(document.getElementById('trTestSummary'), msInfo.trTest, 'h');

// plotConstantStress(document.getElementById('constStressPlot'), msInfo.constStress);
// plotConstantTemperature(document.getElementById('constTPlot'), msInfo.constT);

function showParametersTable( tableElement ) {
  var head = createHead(tableElement);
  var headRow = head.insertRow();

  headRow.appendChild(createHeadCell('C(t<sub>MS</sub>)'));  

  var body = tableElement.createTBody();
  var bodyRow = body.insertRow();

  bodyRow.appendChild(createBodyCell(msInfo.Cms));
}

document.getElementById('calculateButton').onclick = function (e) {
  e.preventDefault();

  var stress = Number(document.getElementById('stressInput').value);
  var T = Number(document.getElementById('temperatureInput').value) + 273.15;

  var p = msInfo.masterCurve.coefficients[0];

  for (var i = 1; i < msInfo.masterCurve.coefficients.length; i++) {
    p += msInfo.masterCurve.coefficients[i] * Math.pow(Math.log10(stress), i);
  }

  var t = Math.pow(10, (p/T)-msInfo.Clm);

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
  excel.set(0, 0, 0, msInfo.material + " Manson-Haferd Model", headStyle);
  

  excel.set(0, 0, 1, 'Clm', defaultStyle);
  excel.set(0, 1, 1, msInfo.Clm, defaultStyle);

  excel.set(0, 0, 2, 'Mastercuve Coefficients', headStyle);
  excel.set(0, 0, 3, 'A', defaultStyle);
  excel.set(0, 0, 4, 'B', defaultStyle);
  excel.set(0, 0, 5, 'C', defaultStyle);
  excel.set(0, 0, 6, 'D', defaultStyle);
  excel.set(0, 0, 7, 'E', defaultStyle);

  var offset = 3;

  for (var i = 0; i < msInfo.masterCurve.coefficients.length; i++) {
    excel.set(0, 1, offset + i, msInfo.masterCurve.coefficients[i], defaultStyle);
  }

  excelAddStressTest( excel, msInfo.stressTest, 0, headStyle, defaultStyle );
  excelAddTrTest( excel, msInfo.trTest, 1, headStyle, defaultStyle );
  excel.generate(msInfo.material + '_' + new Date().toISOString().substring(0, 10) + '_LM.xlsx');
}

window.onresize = function () {
  Plotly.Plots.resize(masterCurvePlot);
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(constStressPlot);
  Plotly.Plots.resize(constTPlot);
};