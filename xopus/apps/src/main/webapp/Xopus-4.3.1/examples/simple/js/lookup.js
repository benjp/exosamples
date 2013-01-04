var top = parent;

document.createElement('extra');
document.createElement('value');

var curRowNumber = -1;
var rows = [];

function initLookupTables()
{
  rows = [];

  // Find lookup table(s)
  var tableEls = document.getElementsByTagName('TABLE');
  for (var i=0; i<tableEls.length; i++)
  {
    var tableEl = tableEls[i];
    if (tableEl.className != 'xopus-lookup')
      continue;

    // Loop rows
    var rowEls = tableEl.getElementsByTagName('TR');
    for (var r=0; r<rowEls.length; r++)
    {
      var rowEl = rowEls[r];
      if (rowEl.id)
        rows.push(rowEl);
    }
  }

  // Set selected row
  var selectedValue = top.dialogArguments.value;
  if (selectedValue)
  {
    var selectedEl = document.getElementById(selectedValue);
    if (selectedEl)
      selectedEl.className = 'xopus-selected';
  }

  if (typeof document.body.attachEvent != "undefined")
  {
    document.body.attachEvent('onmouseover', doMouseOverRow);
    document.body.attachEvent('onmouseout', doMouseOutRow);
    document.body.attachEvent('onclick', doMouseClickRow);
    document.body.attachEvent('onkeydown', doKeyDown);
  }
  else
  {
    document.body.addEventListener('mouseover', doMouseOverRow, false);
    document.body.addEventListener('mouseout', doMouseOutRow, false);
    document.body.addEventListener('click', doMouseClickRow, false);
    document.body.addEventListener('keydown', doKeyDown, false);
  }
}

function doMouseOverRow(evt)
{
  var el = getRowElementFromEvent(evt);
  if (!el)
    return;

  var newRowNumber = getRowNumber(el);
  
  setActiveRow(newRowNumber, true);
}

function doMouseOutRow(evt)
{
  var el = getRowElementFromEvent(evt);
  if (!el)
    return;

  setActiveRow(-1);
}

function doMouseClickRow(evt)
{
  var el = getRowElementFromEvent(evt);
  if (!el)
    return;

  var newRowNumber = getRowNumber(el);

  selectRow(newRowNumber);
}

function doKeyDown(evt)
{
  var el = getRowElementFromEvent(evt);
  if (!el)
    return;

  var newRowNumber = curRowNumber;

  switch (evt.keyCode)
  {
    case 27:
      window.close();
      break;
    case 38:
      if (newRowNumber > 0)
        newRowNumber--;
      break;
    case 40:
     if (newRowNumber < rows.length-1)
        newRowNumber++;
      break;
    case 36:
      newRowNumber = 0;
      break;
    case 35:
      newRowNumber = rows.length-1;
      break;
    case 13:
      selectRow(curRowNumber);
      break;
    case 33:
      if (newRowNumber == -1)
        newRowNumber = rows.length - 1;

      var tMin = rows[newRowNumber].getBoundingClientRect().top - document.body.offsetHeight + 40;

      while ((newRowNumber > 0) && (rows[newRowNumber].getBoundingClientRect().top > tMin))
        newRowNumber--;
      break;
    case 34:
      if (newRowNumber == -1)
        newRowNumber = 0;

      var tMax = rows[newRowNumber].getBoundingClientRect().top + document.body.offsetHeight - 40;

      while ((newRowNumber < rows.length-1) && (rows[newRowNumber].getBoundingClientRect().top < tMax))
        newRowNumber++;
      break;
    default: return(true);
  }

  newRowNumber = Math.min(Math.max(0, newRowNumber), rows.length-1);
  setActiveRow(newRowNumber);

  evt.returnValue = false;
  evt.cancelBubble = true;
}

function getRowElementFromEvent(evt)
{
  // Get element
  var el = evt.srcElement || evt.target;

  // Make sure element exists
  if (!el)
    return null;

  // Look for row element
  while (el && (el.nodeName.toLowerCase() != 'tr'))
  {
    // Check if not selectable, if not return null
    if (el.getAttribute && (el.getAttribute('selectable') == 'false'))
      return null;

    el = el.parentNode;
  }

  // Make sure row found
  if (!el)
    return null;

  // Make sure row is part of a lookup table
  if (el.parentNode.parentNode.className != 'xopus-lookup')
    return null;

  return el;
}

function setActiveRow(newRowNumber, dontScroll)
{
  if (newRowNumber == curRowNumber)
    return;

  if (curRowNumber != -1)
    if (rows[curRowNumber] && rows[curRowNumber].className == 'xopus-hover')
      rows[curRowNumber].className = '';

  if (newRowNumber != -1)
    if (rows[newRowNumber] && rows[newRowNumber].className != 'xopus-selected')
      rows[newRowNumber].className = 'xopus-hover';

  curRowNumber = newRowNumber;

  if (!dontScroll)
  {
    scrollIntoView(rows[curRowNumber]);

    if (newRowNumber == 0)
      document.body.scrollTop = 0;

    if (newRowNumber == rows.length - 1)
      document.body.scrollTop = document.body.scrollHeight;
  }
}

function getRowNumber(el)
{
  // Loop rows
  for (var i=0; i<rows.length; i++)
  {
    var row = rows[i];
    if (el == row)
      return i;
  }

  return -1;
}

function selectRow(newRowNumber)
{
  var el = rows[newRowNumber];
  if (!el || !el.id)
    return;

  // Construct name/value pairs to send
  var results = {};
  results[top.dialogArguments.name] = el.id;

  // Get value elements
  var valueEls = el.getElementsByTagName('value');
  for (var i=0; i<valueEls.length; i++)
  {
    var valueEl = valueEls[i];

    //add to results
    results[valueEl.name] = valueEl.innerHTML;
  }

  top.choose(results);
}

function scrollIntoView(el)
{
  if (!el)
    return;

  // Scroll element to almost top of window
  var bcr = el.getBoundingClientRect();

  var oTop = -1;

  if (bcr.top < 0)
    oTop = document.body.scrollTop + bcr.top - 5;
  else if (bcr.bottom > document.body.offsetHeight)
    oTop = document.body.scrollTop + (bcr.bottom - document.body.offsetHeight) + 5;

  if (oTop != -1)
    document.body.scrollTop = oTop;
}

