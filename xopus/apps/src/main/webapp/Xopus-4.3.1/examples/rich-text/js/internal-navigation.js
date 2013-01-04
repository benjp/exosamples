// define the fragment that is passed to the document
var fragment;
// define an object list of lists with open nodes
var openListNodes = [];
// define the currentnode
var currentNode;

// add a load event listener to the editor
Editor.addEventListener("load",scanDocument);

function scanDocument(evt)
{
  var xmldoc = evt.document;
  // get the first children of every section that is styled as a tab
  var specialsections = xmldoc.selectNodes("//section[@view = 'tabs' or @view = 'accordion']/section[1]");

  for (var i = 0; i < specialsections.getLength(); i++)
  {
    var child = specialsections.item(i);
    var parent = child.getParentNode();
    // make the first child of a tab visible
   expandNode(xmldoc, child);
  }
  
  
  xmldoc.addEventListener("XopusAfterNodeValueModified", afterNodeValueModified);
  xmldoc.addEventListener("XopusAfterAttrInserted", afterNodeValueModified);
}

function afterNodeValueModified(evt)
{
  var val = evt.newValue ? evt.newValue 
            : (evt.attrNode ? evt.attrNode.getNodeValue() : null);
  var node = evt.attrNode ? evt.attrNode : evt.target;

  if (node)
  {
    if(
        node.getNodeType() == 2 &&
        node.getLocalName() == "view" && 
        val != "list" && val != "normal" && 
        node.getOwnerElement().selectNodes("*/processing-instruction('expanded')").getLength() == 0
      )
    {
      var subsect = node.getOwnerElement().selectSingleNode("section");
      if(subsect)
        expandNode(subsect.getOwnerDocument(), subsect);
    }
  }
}

// this event fires every time the cursor enters a different element
Editor.addEventListener("xmlContextChange", updateInternalNavigation);

function updateInternalNavigation(evt)
{
  // get the node from the event; 
  currentNode = evt.newNode;
  if (!currentNode)
    return;

  // check if it is an attribute or textnode and get an element
  if (currentNode.getNodeType() == 2)
    currentNode = currentNode.getOwnerElement();
  else if (currentNode.getNodeType() != 1)
    currentNode = currentNode.getParentNode();

  if (!currentNode || !currentNode.getOwnerDocument())
    return;
   
  var originNode = currentNode;
  
  // get the document root node
  var document = currentNode.getOwnerDocument().getDocumentElement();
  var doc = currentNode.getOwnerDocument();
  
  // find the proper element, a child of a list, otherwise default back to the document
  if (currentNode.getParentNode() && currentNode.getParentNode().getLocalName() != "article")
    while (currentNode && currentNode.getLocalName() != "section" && currentNode.getParentNode() != document)
      currentNode = currentNode.getParentNode();
    
   expandNode(doc, currentNode);
}

function expandNode(doc, node)
{
  if(!node) return;
  var parent = node.getParentNode();
  var view = parent.getAttribute("view");
  
  if(view == "normal" || view == "list"  || view == "")
    return;
  
  if(node.selectNodes("processing-instruction('expanded')").getLength() != 0) 
    return; //don't do anything if it is already open and a tab item
  else 
    parent.selectNodes("*/processing-instruction('expanded')").removeAll(); //clear tabs so that the new one opens
    
  if(node.selectNodes("processing-instruction('expanded')").getLength() == 0)
  {
    var pi = doc.createProcessingInstruction('expanded');
    node.insertBefore(pi, node.getFirstChild());
  }
  else
    node.selectNodes("processing-instruction('expanded')").removeAll();
}
