const colors = [ 
  '#2a5788', //Header blue
  '#f96332', //Primary orange  
  '#9b59b6', //Purple
  '#2ecc71', //Green
  '#1abc9c', //Turquoise
  '#2c3e50' //Dark blue
];

Math.log10 = Math.log10 || function(x) {
  return Math.log(x) * Math.LOG10E;
};

HTMLElement.prototype.hasClass = function( className ) {
	if (this.classList)
		return this.classList.contains(className)
	else
		return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

HTMLElement.prototype.addClass = function( className ) {
	if (this.classList)
		this.classList.add(className)
	else if (!hasClass(this, className)) this.className += " " + className
}


function setTitle( titleElement, title ) {
  document.getElementsByTagName('title')[0].innerText = title;
  titleElement.innerText = title;
}

function createHead( tableElement ) {
  const head = tableElement.createTHead();
  head.addClass('text-primary');
  return head;
}

function createHeadCell( cellContent ) {
  const headCell = document.createElement('th');
  headCell.addClass('text-center');
  headCell.innerHTML = cellContent;
  return headCell;
}

function createBodyCell( cellContent ) {
  const bodyCell = document.createElement('td');
  bodyCell.addClass('text-center');
  bodyCell.addClass('cp');
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerHTML = cellContent;
  return bodyCell;
}

function createWarning( warningContent ) {
  const warningElement = document.createElement('div');
  warningElement.addClass('alert');
  warningElement.addClass('alert-warning');
  warningElement.innerHTML = '<b>Warning - </b> ' + warningContent;  
  return warningElement;
}

function plotIsoStressInverse( graphElement, isoStressData ) {
  const data = [];

  for( let i = 0; i < isoStressData.stress.length; i++) {    
    const x = [];
    const y = [];
    const xFit = [];
    const yFit = [];

    for( let j = 0; j < isoStressData.T[i].length ; j++) {
      x.push( 1.0 / isoStressData.T[i][j] );
      y.push( Math.log10(isoStressData.tr[i][j]) );
      xFit.push( isoStressData.fitInverse.T[i][j] )
      yFit.push( isoStressData.fitInverse.tr[i][j] )
    }

    let trace = { x: x, 
                  y: y, 
                  mode: 'markers',
                  showlegend: false,
                  name: isoStressData.stress[i] + 'MPa',
                  legendgroup: i,
                  marker: { color: colors[i] }
                };
    
    data.push( trace );

    trace = { x: xFit, 
              y: yFit, 
              mode: 'line',
              name: isoStressData.stress[i] + 'MPa Fitted',
              legendgroup: i,
              line: { color: colors[i] }
            };
    
    data.push( trace );
  }

  const layout = {    
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

  Plotly.newPlot(graphElement,data,layout);
}

function plotIsoStress( graphElement, isoStressData) {
  const data = [];

  for( let i = 0; i < isoStressData.stress.length; i++) {    
    const x = [];
    const y = [];
    const xFit = [];
    const yFit = [];

    for( let j = 0; j < isoStressData.T[i].length ; j++) {
      x.push( isoStressData.T[i][j] );
      y.push( Math.log10(isoStressData.tr[i][j]) );
      xFit.push( isoStressData.fit.T[i][j] )
      yFit.push( isoStressData.fit.tr[i][j] )
    }

    let trace = { x: x, 
                  y: y, 
                  mode: 'markers',
                  showlegend: false,
                  name: isoStressData.stress[i] + 'MPa',
                  legendgroup: i,
                  marker: { color: colors[i] }
                };
    
    data.push( trace );

    trace = { x: xFit, 
              y: yFit, 
              mode: 'line',
              name: isoStressData.stress[i] + 'MPa Fitted',
              legendgroup: i,
              line: { color: colors[i] }
            };
    
    data.push( trace );
  }

  const layout = {    
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

  Plotly.newPlot(graphElement,data,layout);
}


document.addEventListener( 'click', ( event ) => {
  if( event.target.classList.contains('cp') ) {
    const tempTextArea = document.createElement('textArea');
    tempTextArea.value = event.target.innerText;
    const valueCopied = tempTextArea.value;
    document.body.appendChild( tempTextArea );
    tempTextArea.select();

    try{
      let copySuccessfull = document.execCommand('copy');

      if( copySuccessfull ) {
        event.target.innerText = 'Copied';
      } else {
        event.target.innerText = 'Could not copy';
      }
    } catch ( error ) {
      console.error(error);
    }

    document.body.removeChild(tempTextArea);
    setTimeout( resetElement, 1000, event.target, valueCopied);
  }
});

function resetElement( element, content ) {
  element.innerText = content;
}