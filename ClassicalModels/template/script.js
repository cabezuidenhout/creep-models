var modelData = JSON.parse(data);

setTitle( document.getElementById('pageTitle'), modelData.material + ' ' + modelData.name + ' Model');

document.getElementById('modelName').innerText = modelData.name;

showParameterEquation( document.getElementById('parameterEq') , modelData.name );
showConstantsTable( document.getElementById('constantsTable') , modelData.name , modelData.constants );
showMasterCuveTable( document.getElementById('mastercurveTable') , modelData.masterCurve ); 

if( modelData.constants.TInverted ) {
  plotIsoStressInverse(document.getElementById('isoStressPlot'), modelData.isoStress, modelData.material + " Iso-Stress (±" + modelData.isoStress.tolerance + "MPa)");  
} else {  
  plotIsoStress(document.getElementById('isoStressPlot'), modelData.isoStress, modelData.material + " Iso-Stress (±" + modelData.isoStress.tolerance + "MPa)");
}

plotMasterCurve(document.getElementById('masterCurvePlot'), modelData.masterCurve, modelData.material + " " + modelData.name + " Mastercuve");

showStressTestTable(document.getElementById('stressTest'), modelData.stressTest, document.getElementById('stressTestWarning'));
showTestSummaryTable(document.getElementById('stressTestSummary'), modelData.stressTest, 'MPa');


showTrTestTable(document.getElementById('trTest'), modelData.trTest, document.getElementById('trTestWarning'));
showTestSummaryTable(document.getElementById('trTestSummary'), modelData.trTest, 'h');


plotConstantStress(document.getElementById('constStressPlot'), modelData.constStress);
plotConstantTemperature(document.getElementById('constTPlot'), modelData.constT);

showTrSimplifiedEquation( document.getElementById('trSimplifiedEq'), modelData.name );
showTrEquation( document.getElementById('trEq') , modelData.name );

document.getElementById('calculateButton').onclick = function (e) {
  e.preventDefault();

  var stress = Number(document.getElementById('stressInput').value);
  var T = Number(document.getElementById('temperatureInput').value) + 273.15;

  document.getElementById('calculatedTr').innerText = calculateTr(modelData, stress, T).toFixed(0);
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

  excelAddModel( excel, modelData, headStyle, defaultStyle );
  excelAddStressTest( excel, modelData.stressTest, 0, headStyle, defaultStyle );
  excelAddTrTest( excel, modelData.trTest, 1, headStyle, defaultStyle );  
  excel.generate(modelData.material + ' ' + new Date().toISOString().substring(0, 10) + ' ' + modelData.name + '.xlsx');
}

window.onresize = function () {
  Plotly.Plots.resize(masterCurvePlot);
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(constStressPlot);
  Plotly.Plots.resize(constTPlot);
};
/*

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
};*/