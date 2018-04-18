const parsedData = JSON.parse(data);

setTitle(parsedData.material);
showParameters( parsedData.logta, parsedData.Ta);
showMasterCurve( parsedData.masterCurve.coefficients);
showRanges( parsedData.stressRange, parsedData.temperatureRange);
plotParameterFit( parsedData.masterCurve.trainData, parsedData.masterCurve.testData );
plotIsoStress( parsedData.isoStressData, parsedData.isoStressFit )
showStressTestTable( parsedData.stressTest );
showTrTestTable( parsedData.trTest );
plotConstantStress( parsedData.constStress );
plotConstantTemperature( parsedData.constT );

document.addEventListener( 'click', (event) => {
  if( event.target.classList.contains('cp') ) {
    const tempTextArea = document.createElement('textArea');
    tempTextArea.value = event.target.innerText;
    const valueCopied = event.target.innerText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();

    try{
      let copySuccessfull = document.execCommand('copy');

      if( copySuccessfull ) {
        event.target.innerText = 'Copied';
      } else {
        event.target.innerText = 'Could not copy';
      }
      
    } catch( error ) {
      console.error(error);
    }

    document.body.removeChild(tempTextArea);
    setTimeout( resetElement, 1000, event.target, valueCopied);
  }
});

function resetElement( em , emContent ) {
  em.innerText = emContent;  
}