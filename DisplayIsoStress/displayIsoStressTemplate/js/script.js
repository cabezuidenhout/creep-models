const isoStressData = JSON.parse(data);

setTitle( document.getElementById('pageTitle'), isoStressData.material + ' Iso-Stress with ' + isoStressData.tolerance + 'MPa tolerance');
showIsoStressTable( document.getElementById('isoStressData') );

function showIsoStressTable( tableElement ) {
  const head = createHead( tableElement );
  const headRow = head.insertRow();

  headRow.appendChild( createHeadCell('Stress (MPa)') );

  for( let i = 0; i < isoStressData.tr[0].length; i++ ) {
    headRow.appendChild( createHeadCell( isoStressData.tr[0][i] + 'h (&deg;C)') );
  }

  const body = tableElement.createTBody();
  let bodyRow;

  for( let r = 0; r < isoStressData.stress.length; r++) {
    bodyRow = body.insertRow();
    bodyRow.appendChild( createBodyCell( isoStressData.stress[r]) );

    for( let c = 0; c < isoStressData.tr[0].length; c++ ) {
      bodyRow.appendChild( createBodyCell( isoStressData.T[r][c]) );
    }
  }
}