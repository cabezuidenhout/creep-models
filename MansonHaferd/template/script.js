setTitle( document.querySelector('#pageTitle'), parsedData.material, parsedData.model);
showParameters( parsedData.logta, parsedData.Ta);
showMasterCurve( parsedData.masterCurve.coefficients);
showRanges( parsedData.stressRange, parsedData.temperatureRange);

plotParameterFit( parsedData.masterCurve.trainData, parsedData.masterCurve.testData );

plotIsoStress( parsedData.isoStressData, parsedData.isoStressFit )

showStressTestTable( document.querySelector('#stressTestTable'), parsedData.stressTest );
showTestSummaryTable( document.querySelector('#stressTestSummaryTable'), parsedData.stressTest.errors, 'MPa', 3 );

showTrTestTable( document.querySelector('#trTestTable'), parsedData.trTest );
showTestSummaryTable( document.querySelector('#trTestSummaryTable'), parsedData.trTest.errors, 'h', 0 );

plotConstantStress( parsedData.constStress );
plotConstantTemperature( parsedData.constT );

