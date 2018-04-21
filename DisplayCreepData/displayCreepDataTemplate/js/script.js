const creepData = JSON.parse(data);

setTitle( document.querySelector('#pageTitle'), creepData.material + ' Creep Data');
showCreepDataTable( document.querySelector('#creepDataTable') );

function showCreepDataTable( tableElement ) {
  const head = createHeadRow(tableElement);
  const headRow = head.insertRow();
  
  headRow.appendChild( createHeadCell( 'Temperature (&deg;C)' ) );

  let orderWarning = false;
  let previousTr = 0;

  for( let i = 0; i < creepData.tr.length ; i++ ){

    if( creepData.tr[i] > previousTr ) {
      previousTr = creepData.tr[i];
    } else {
      orderWarning = true;
    }

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

  console.log( orderWarning );

  if( orderWarning ) {    
    const creepTableWarning = document.querySelector('#creepDataTableWarning')
    creepTableWarning.appendChild( createWarning("Time to rupture recomended order is ascending") );
  }
}
