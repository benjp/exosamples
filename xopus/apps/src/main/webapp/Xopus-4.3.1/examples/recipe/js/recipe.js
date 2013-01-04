IO.setSaveXMLFunction(function(){alert('This is just a demo, so no actual saving is performed.')});

var morphEl = null;
var morphElCN = null;


function load(evt)
{
  Editor.getActiveDocument().addEventListener("XopusAfterNodeValueModified", doAfterNodeValueModified);
}

function unload()
{
  Editor.removeEventListener("afterRedraw", doAfterRedraw);
}

function doAfterRedraw(evt)
{
  if (morphEl && morphEl.className != morphElCN)
  {
    var el = morphEl;
    morphEl = null;

    var newCN = el.className;
    el.className = morphElCN;

    Spif.Utils.setTimeoutHandler(function(){ Spif.ClassNameAbstraction.set(el, newCN); }, 0);
  }
}

function doAfterNodeValueModified(evt)
{
  var node = evt.target.getNodeType() == 3 ? evt.target.getParentNode() : evt.target;

  switch (node.getLocalName())
  {
    case "hidden":
      morphEl = document.getElementById(node.getOwnerElement().getLocalName());
      morphElCN = morphEl.className;
      break;
    case "category":
      morphEl = document.getElementById("body");
      morphElCN = morphEl.className;
      break;
  }
}

Editor.addEventListener("afterRedraw", doAfterRedraw);
Editor.addEventListener("load", load);
Editor.addEventListener("unload", unload);


