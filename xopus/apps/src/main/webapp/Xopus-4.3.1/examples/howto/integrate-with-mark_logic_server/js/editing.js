
//set UI language
Editor.setUILanguage("en");

//listen to the Xopus load event
Editor.addEventListener("load",doLoad);

function doLoad(evt)
{
  //get the XML document that has been loaded
  var doc = evt.document;
  //attach an event to the document, listening to when element have been inserted
  doc.addEventListener("XopusAfterChildInserted",afterChildInserted);
}


function afterChildInserted(evt)
{
  //use the event to find the node involved
  var node = evt.childNode;
  
  //do something for the example node
  //this attribute is needed so that line breaks and spaces are preserved within the example node
  if(node.getNodeName() == "example") 
    node.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve");
}

////tell xopus what to do when exiting
//Editor.setExitFunction(exitFunction);
//
//function exitFunction()
//{
//    alert(parent.document.location.href.replace("actions/frame","start"));
//  if(confirm("Are you sure you want to quit?"))
//    parent.document.location.href = parent.document.location.href.replace("actions/frame","start");
//}
