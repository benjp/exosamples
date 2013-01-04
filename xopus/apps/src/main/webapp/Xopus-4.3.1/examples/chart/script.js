IO.setSaveXMLFunction(function(){alert('This is just a demo, so no actual saving is performed.')});

Editor.addSimpleListener("load", loadHandler);

function loadHandler(evt)
{
  var xmlDoc = evt.document;
  
  xmlDoc.addSimpleListener("XopusAfterChildInserted", function (evt) 
  { 
    if (evt.childNode.getNodeName() != "dataItem")
      return;
    
    evt.childNode.setAttribute("value", "0");
    
    var highest = evt.childNode.selectSingleNode("//dataItem[@id][not(@id < //dataItem/@id)]");
    var highestId = highest ? 1*highest.getAttribute("id") : 0;
    evt.childNode.setAttribute("id", 1 + 1*highestId);
  });
}
