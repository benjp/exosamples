// This function is called when the save button is pressed, or when the save
// function is called on an XMLDocument.
function mySaveFunction(uri, xmlDocument)
{
  // HTTP POST the XML document to the save.phpfile.
  var result = HTTPTools.postXML("save.php?uri="+uri, xmlDocument);  
  // Show a dialog with the result.
    
  return confirm(
    "Called save.php\n" +
    "Result: " + result + "\n" +
    "Press OK to update the Save button accordingly.");  
}

// Register the save function.
IO.setSaveXMLFunction(mySaveFunction);