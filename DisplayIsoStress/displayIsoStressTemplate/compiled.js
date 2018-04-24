'use strict';

var isoStressData = JSON.parse(data);
var t = document.getElementById('test');

setTitle(document.getElementById('pageTitle'), isoStressData.material + ' Iso-Stress with ' + isoStressData.tolerance + 'MPa tolerance');
showIsoStressTable(document.getElementById('isoStressData'));
plotIsoStress();

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

function plotIsoStress() {
  var data = [];

  for (var i = 0; i < isoStressData.stress.length; i++) {
    var x = [];
    var y = [];
    var xFit = [];
    var yFit = [];

    for (var j = 0; j < isoStressData.T[i].length; j++) {
      x.push(isoStressData.T[i][j]);
      y.push(Math.log10(isoStressData.tr[i][j]));
      xFit.push(isoStressData.fit.T[i][j]);
      yFit.push(isoStressData.fit.tr[i][j]);
    }

    var trace = { x: x,
      y: y,
      mode: 'markers',
      showlegend: false,
      name: isoStressData.stress[i] + 'MPa',
      legendgroup: i,
      marker: { color: colors[i] }
    };

    data.push(trace);

    trace = { x: xFit,
      y: yFit,
      mode: 'line',
      name: isoStressData.stress[i] + 'MPa Fitted',
      legendgroup: i,
      line: { color: colors[i] }
    };

    data.push(trace);
  }

  var layout = {
    xaxis: {
      title: 'Temperature (°C)'
    },
    yaxis: {
      title: 'log(t) (h)'
    },
    margin: {
      t: 0
    }
  };

  Plotly.newPlot(t, data, layout);
}

window.onresize = function () {
  Plotly.Plots.resize(t);
};
