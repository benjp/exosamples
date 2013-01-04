function findXopusJS()
{
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++)
    if (scripts[i].src.match(/xopus.js/))
      return scripts[i].src;
}

function gotoXopusHTML(xopusJS)
{
  document.location.replace(
    xopusJS.replace(/xopus\.js/, "xopus.html")
      + "#" + document.location.pathname + document.location.search + document.location.hash
  );
}

function inXopus()
{
  try {
    var cur = window;
    while (!(cur.__xopus__ || cur.startXopus) && cur.parent != cur)
      cur = cur.parent;
    return !!(cur.__xopus__ || cur.startXopus);
  } catch (e) { }
}

if (!inXopus())
  gotoXopusHTML(findXopusJS());