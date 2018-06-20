var isoStressData = JSON.parse(data);

setTitle( document.getElementById('pageTitle'), isoStressData.material + ' Iso-Stress with ' + isoStressData.tolerance + 'MPa tolerance');
showIsoStress();


function showIsoStress() {
  if( isoStressData.stress != undefined ) {
    plotIsoStress( document.getElementById('isoStressPlot'), isoStressData, isoStressData.material + " Iso-Stress (±" + isoStressData.tolerance + "MPa)" );
    plotIsoStressInverse( document.getElementById('isoStressInversePlot'), isoStressData, isoStressData.material + " Iso-Stress (±" + isoStressData.tolerance + "MPa)" );
  } else {
    document.getElementById('warningDiv').appendChild( createWarning("No Iso-Stress lines were found") );
  }
}

window.onresize = function () {
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(isoStressInversePlot);
};