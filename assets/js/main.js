function setTitle( titleElement, title ) {
  document.querySelector('title').innerText = title;
  titleElement.innerText = title;
}

function createHeadRow( tableElement ) {
  const head = tableElement.createTHead();
  head.classList = 'text-primary';
  return head;
}

function createHeadCell( cellContent ) {
  const headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = cellContent;
  return headCell;
}

function createBodyCell( cellContent ) {
  const bodyCell = document.createElement('td');
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerHTML = cellContent;
  return bodyCell;
}