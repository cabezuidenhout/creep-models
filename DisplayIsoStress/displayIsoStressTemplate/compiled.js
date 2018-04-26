'use strict';

var isoStressData = JSON.parse(data);
var isoStressPlot = document.getElementById('isoStressPlot');
var isoStressInversePlot = document.getElementById('isoStressInversePlot');

setTitle(document.getElementById('pageTitle'), isoStressData.material + ' Iso-Stress with ' + isoStressData.tolerance + 'MPa tolerance');
showIsoStressTable(document.getElementById('isoStressData'));
plotIsoStress(isoStressPlot, isoStressData);
plotIsoStressInverse(isoStressInversePlot, isoStressData);

function showIsoStressTable(tableElement) {
  var head = createHead(tableElement);
  var headRow = head.insertRow();

  headRow.appendChild(createHeadCell('Stress (MPa)'));

  for (var i = 0; i < isoStressData.tr[0].length; i++) {
    headRow.appendChild(createHeadCell(isoStressData.tr[0][i] + 'h (&deg;C)'));
  }

  var body = tableElement.createTBody();
  var bodyRow = void 0;

  for (var r = 0; r < isoStressData.stress.length; r++) {
    bodyRow = body.insertRow();
    bodyRow.appendChild(createBodyCell(isoStressData.stress[r]));

    for (var c = 0; c < isoStressData.tr[0].length; c++) {
      bodyRow.appendChild(createBodyCell(isoStressData.T[r][c]));
    }
  }
}

window.onresize = function () {
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(isoStressInversePlot);
};
