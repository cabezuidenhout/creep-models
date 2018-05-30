const mhData = JSON.parse(data);

setTitle( document.getElementById('pageTitle'), mhData.material + ' Manson-Haferd Model');
populateMansonHaferdTable( document.getElementById('mhParameterTable') );
populateMasterCuveTable( document.getElementById('mastercurveCoefficientTable') , mhData.masterCurve.coefficients );
plotIsoStress( document.getElementById('isoStressPlot') , mhData.isoStressData);
plotMasterCurve( document.getElementById('masterCurvePlot'), mhData.masterCurve );
populateStressPredictionTable( document.getElementById('stressPredictionTest'), mhData.stressTest);
populateStressPredictionSummaryTable( document.getElementById('stressTestSummary'), mhData.stressTest );

function populateMansonHaferdTable( tableElement ) {
  const head = createHead( tableElement );
  const headRow = head.insertRow();

  headRow.appendChild( createHeadCell('log(t<sub>a</sub>)') );
  headRow.appendChild( createHeadCell('T<sub>a</sub>') );

  const body = tableElement.createTBody();
  const bodyRow = body.insertRow();
  
  bodyRow.appendChild( createBodyCell( mhData.logta) );
  bodyRow.appendChild( createBodyCell( mhData.Ta) );
}

window.onresize = function() {
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(masterCurvePlot);
}