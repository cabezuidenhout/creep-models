'use strict';

function setTitle(titleElement, title) {
  document.querySelector('title').innerText = title;
  titleElement.innerText = title;
}

function createHeadRow(tableElement) {
  var head = tableElement.createTHead();
  head.classList = 'text-primary';
  return head;
}

function createHeadCell(cellContent) {
  var headCell = document.createElement('th');
  headCell.classList = 'text-center';
  headCell.innerHTML = cellContent;
  return headCell;
}

function createBodyCell(cellContent) {
  var bodyCell = document.createElement('td');
  bodyCell.classList = 'text-center cp';
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerHTML = cellContent;
  return bodyCell;
}

function createWarning(warningContent) {
  var warningElement = document.createElement('div');
  warningElement.classList = "alert alert-warning";
  warningElement.innerHTML = '<b>Warning - </b> ' + warningContent;
  return warningElement;
}
