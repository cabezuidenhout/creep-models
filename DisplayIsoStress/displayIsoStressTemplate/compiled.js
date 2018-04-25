'use strict';

var isoStressData = JSON.parse(data);
var isoStressPlot = document.getElementById('isoStressPlot');
var isoStressInversePlot = document.getElementById('isoStressInversePlot');
var exportButton = document.getElementById('exportButton');

setTitle(document.getElementById('pageTitle'), isoStressData.material + ' Iso-Stress with ' + isoStressData.tolerance + 'MPa tolerance');
showIsoStressTable(document.getElementById('isoStressData'));
plotIsoStress();
plotIsoStressInverse();

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
      t: 20
    }
  };

  Plotly.newPlot(isoStressPlot, data, layout);
}

function plotIsoStressInverse() {
  var data = [];

  for (var i = 0; i < isoStressData.stress.length; i++) {
    var x = [];
    var y = [];
    var xFit = [];
    var yFit = [];

    for (var j = 0; j < isoStressData.T[i].length; j++) {
      x.push(1.0 / isoStressData.T[i][j]);
      y.push(Math.log10(isoStressData.tr[i][j]));
      xFit.push(isoStressData.fitInverse.T[i][j]);
      yFit.push(isoStressData.fitInverse.tr[i][j]);
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
      title: '1/Temperature (1/°C)'
    },
    yaxis: {
      title: 'log(t) (h)'
    },
    margin: {
      t: 20
    }
  };

  Plotly.newPlot(isoStressInversePlot, data, layout);
}

window.onresize = function () {
  Plotly.Plots.resize(isoStressPlot);
  Plotly.Plots.resize(isoStressInversePlot);
};

exportButton.addEventListener('click', function () {
  var excel = $JExcel.new();
  excel.set({ sheet: 0, value: isoStressData.material + " Iso-Stress Data" });
  excel.set(0, 0, 0, isoStressData.material + ' Iso-Stress');
  excel.set(0, 0, 1, "Tolerance :");
  excel.set(0, 1, 1, isoStressData.tolerance);
  //excel.set( sheet, c, r)
  excel.set(0, 0, 4, "Iso-Stress Code Data");

  excel.set(0, 0, 5, "Stress (MPa)");

  for (var i = 0; i < isoStressData.tr[0].length; i++) {
    excel.set(0, 1 + i, 5, isoStressData.tr[0][i] + 'h (degC)');
  }

  for (var r = 0; r < isoStressData.stress.length; r++) {
    excel.set(0, 0, 6 + r, isoStressData.stress[r]);

    for (var c = 0; c < isoStressData.T[r].length; c++) {
      excel.set(0, 1 + c, 6 + r, isoStressData.T[r][c]);
    }
  }

  excel.generate(isoStressData.material + '_IsoStress.xlsx');
});
