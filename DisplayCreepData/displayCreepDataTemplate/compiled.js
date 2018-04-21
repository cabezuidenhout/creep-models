'use strict';

var creepData = JSON.parse(data);

setTitle(document.querySelector('#pageTitle'), creepData.material + ' Creep Data');
showCreepDataTable(document.querySelector('#creepDataTable'));

function showCreepDataTable(tableElement) {
  var head = createHeadRow(tableElement);
  var headRow = head.insertRow();

  headRow.appendChild(createHeadCell('Temperature (&deg;C)'));

  for (var i = 0; i < creepData.tr.length; i++) {
    headRow.appendChild(createHeadCell(creepData.tr[i] + 'h (MPa)'));
  }

  var bodyElement = tableElement.createTBody();

  var rowElement = void 0;

  for (var r = 0; r < creepData.T.length; r++) {
    rowElement = bodyElement.insertRow();
    rowElement.appendChild(createBodyCell(creepData.T[r]));

    for (var c = 0; c < creepData.tr.length; c++) {
      rowElement.appendChild(createBodyCell(creepData.stress[r][c]));
    }
  }
}
