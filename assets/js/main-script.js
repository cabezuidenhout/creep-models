HTMLElement.prototype.hasClass = function (className) {
  if (this.classList) return this.classList.contains(className);else return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

HTMLElement.prototype.addClass = function (className) {
  if (this.classList) this.classList.add(className);else if (!hasClass(this, className)) this.className += " " + className;
};

function setTitle(titleElement, title) {
  document.getElementsByTagName('title')[0].innerText = title;
  titleElement.innerText = title;
}

function createHead(tableElement) {
  var head = tableElement.createTHead();
  head.addClass('text-info');
  return head;
}

function createHeadCell(cellContent) {
  var headCell = document.createElement('th');
  headCell.addClass('text-center');
  headCell.innerHTML = cellContent;
  return headCell;
}

function createBodyCell(cellContent) {
  var bodyCell = document.createElement('td');
  bodyCell.addClass('text-center');
  bodyCell.addClass('cp');
  bodyCell.title = 'Click to copy to Clipboard';
  bodyCell.innerHTML = cellContent;
  return bodyCell;
}

function createBodyLabelCell(cellContent) {
  var bodyCell = document.createElement('td');
  bodyCell.addClass('text-center');
  bodyCell.addClass('text-primary');
  bodyCell.innerHTML = cellContent;
  return bodyCell;
}