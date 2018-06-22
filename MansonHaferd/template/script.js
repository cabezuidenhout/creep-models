var mhInfo = JSON.parse(data);

setTitle( document.getElementById('pageTitle'), mhInfo.material + ' ' + mhInfo.model + ' Model');
showParametersTable( document.getElementById('paramaterTable') );
showMasterCuveTable( document.getElementById('mastercurveTable') , mhInfo.masterCurve ); 

plotIsoStress(document.getElementById('isoStressPlot'), mhInfo.isoStress, mhInfo.material + " Iso-Stress (±" + mhInfo.isoStress.tolerance + "MPa)");
plotMasterCurve(document.getElementById('masterCurvePlot'), mhInfo.masterCurve, mhInfo.material + " Manson-Haferd Mastercuve");

showStressTestTable(document.getElementById('stressTest'), mhInfo.stressTest, document.getElementById('stressTestWarning'));
showTestSummaryTable(document.getElementById('stressTestSummary'), mhInfo.stressTest, 'MPa');

showTrTestTable(document.getElementById('trTest'), mhInfo.trTest, document.getElementById('trTestWarning'));
showTestSummaryTable(document.getElementById('trTestSummary'), mhInfo.trTest, 'h');

plotConstantStress(document.getElementById('constStressPlot'), mhInfo.constStress);
plotConstantTemperature(document.getElementById('constTPlot'), mhInfo.constT);

function showParametersTable( tableElement ) {
  var head = createHead(tableElement);
  var headRow = head.insertRow();

  headRow.appendChild(createHeadCell('log(t<sub>a</sub>)'));
  headRow.appendChild(createHeadCell('T<sub>a</sub>'));

  var body = tableElement.createTBody();
  var bodyRow = body.insertRow();

  bodyRow.appendChild(createBodyCell(mhInfo.logta));
  bodyRow.appendChild(createBodyCell(mhInfo.Ta));
}

document.getElementById('calculateButton').onclick = function (e) {
  e.preventDefault();

  var stress = Number(document.getElementById('stressInput').value);
  var T = Number(document.getElementById('temperatureInput').value) + 273.15;

  var p = mhInfo.masterCurve.coefficients[0];

  for (var i = 1; i < mhInfo.masterCurve.coefficients.length; i++) {
    p += mhInfo.masterCurve.coefficients[i] * Math.pow(Math.log10(stress), i);
  }

  var t = Math.pow(10, p * (T - mhInfo.Ta) + mhInfo.logta);

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
  excel.set(0, 0, 0, mhInfo.material + " Manson-Haferd Model", headStyle);
  

  excel.set(0, 0, 1, 'log(ta)', defaultStyle);
  excel.set(0, 1, 1, mhInfo.logta, defaultStyle);

  excel.set(0, 0, 2, 'Ta', defaultStyle);
  excel.set(0, 1, 2, mhInfo.Ta, defaultStyle);

  excel.set(0, 0, 3, 'Mastercuve Coefficients', headStyle);
  excel.set(0, 0, 4, 'A', defaultStyle);
  excel.set(0, 0, 5, 'B', defaultStyle);
  excel.set(0, 0, 6, 'C', defaultStyle);
  excel.set(0, 0, 7, 'D', defaultStyle);
  excel.set(0, 0, 8, 'E', defaultStyle);

  for (var i = 0; i < mhInfo.masterCurve.coefficients.length; i++) {
    excel.set(0, 1, 4 + i, mhInfo.masterCurve.coefficients[i], defaultStyle);
  }

  excelAddStressTest( excel, mhInfo.stressTest, 0, headStyle, defaultStyle );
  excelAddTrTest( excel, mhInfo.trTest, 1, headStyle, defaultStyle );
  excel.generate(mhInfo.material + '_' + new Date().toISOString().substring(0, 10) + '_MH.xlsx');
}

window.onresize = function () {
  Plotly.Plots.resize(masterCurvePlot);
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(constStressPlot);
  Plotly.Plots.resize(constTPlot);
};