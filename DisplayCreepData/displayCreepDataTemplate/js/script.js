const creepData = JSON.parse(data);

setTitle( document.querySelector('#pageTitle'), creepData.material + ' Creep Data');
showCreepDataTable( document.querySelector('#creepDataTable') );

function showCreepDataTable( tableElement ) {
  const head = createHeadRow(tableElement);
  const headRow = head.insertRow();
  
  headRow.appendChild( createHeadCell( 'Temperature (&deg;C)' ) );

  for( let i = 0; i < creepData.tr.length ; i++ ){
    headRow.appendChild( createHeadCell( creepData.tr[i] + 'h (MPa)') );
  }

  const bodyElement = tableElement.createTBody();

  let rowElement;

  for( let r = 0; r < creepData.T.length ; r++) {
    rowElement = bodyElement.insertRow();
    rowElement.appendChild( createBodyCell( creepData.T[r]) );

    for( let c = 0; c < creepData.tr.length; c++) {
      rowElement.appendChild( createBodyCell( creepData.stress[r][c] ) );
    }
  }
}
