// This function is called when the save button is pressed, or when the save
// function is called on an XMLDocument.
function mySaveFunction(uri, xmlDocument)
{
  // HTTP POST the XML document to the save.rb file.
  var result = HTTPTools.postXML("http://stephen:3000/My_Test/stephen", xmlDocument, "UTF-8");
      alert(result);
  // Show a dialog with the result.
  /*
  return confirm(
    "Called save.aspx\n" +
    "Result: " + result + "\n" +
    "Press OK to update the Save button accordingly.");
    */
}

// Register the save function.
IO.setSaveXMLFunction(mySaveFunction);