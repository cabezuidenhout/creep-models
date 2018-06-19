var creepData = JSON.parse(data);

setTitle( document.getElementById('pageTitle'), creepData.material + ' Creep Data' );
showCreepDataTable(document.getElementById('creepDataTable'));

function showCreepDataTable(tableElement) {
  var head = createHead(tableElement);
  var headRow = head.insertRow();

  headRow.appendChild(createHeadCell('Temperature (&deg;C)'));

  var trOrderWarning = false;
  var previousTr = 0;

  for (var i = 0; i < creepData.tr.length; i++) {

    if (creepData.tr[i] > previousTr) {
      previousTr = creepData.tr[i];
    } else {
      trOrderWarning = true;
    }

    headRow.appendChild(createHeadCell(creepData.tr[i] + 'h (MPa)'));
  }

  var bodyElement = tableElement.createTBody();

  var rowElement = void 0;

  var TOrderWarning = false;
  var previousT = 0;

  for (var r = 0; r < creepData.T.length; r++) {
    rowElement = bodyElement.insertRow();
    rowElement.appendChild(createBodyCell(creepData.T[r]));
    
    if( creepData.T[r] > previousT ) {
      previousT = creepData.T[r];
    } else {
      TOrderWarning = true;
    }

    for (var c = 0; c < creepData.tr.length; c++) {
      rowElement.appendChild(createBodyCell(creepData.stress[r][c]));
    }
  }

  if (trOrderWarning) {    
    var creepTableWarning = document.getElementById('creepDataTableWarning');
    creepTableWarning.appendChild(createWarning("Time to rupture recomended order is ascending"));
  }

  if (TOrderWarning) {
    console.log("warninig");
    var creepTableWarning = document.getElementById('creepDataTableWarning');
    creepTableWarning.appendChild(createWarning("Temperature recomended order is ascending"));
  }
}
