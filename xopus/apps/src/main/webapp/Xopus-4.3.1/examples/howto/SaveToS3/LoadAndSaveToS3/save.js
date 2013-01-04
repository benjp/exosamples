// This function is called when the save button is pressed, or when the save
// function is called on an XMLDocument.
function mySaveFunction(uri, xmlDocument)
{
  // HTTP POST the XML document to the save.aspx file.
  var result = HTTPTools.postXML("save.aspx", xmlDocument);  
  
  // Show a dialog with the result.
  alert(result);
  
  // Save successful!
  return true;  
}

function myLoadFunction(uri)
{
  // Load and don't cache
  return HTTPTools.getXML("load.aspx", true);
}

// Register the save function.
IO.setSaveXMLFunction(mySaveFunction);

IO.setLoadXMLFunction(myLoadFunction);