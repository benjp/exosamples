/*
 * WebDAVTools returns an object
 * .locked (boolean status of the lock)
 * .message (debug message)
 * .responseXML (xmlDocument of the result for GET method)
 * .responseText (responseText of the PUT method)
 */

// This function will be used to load the document. 
// 
// Locks the document if the server supports locking.
function loadAndLock(uri)
{    
  var lockObj = WebDAVTools.getXML(uri);
  if (lockObj.locked == false)
    alert(lockObj.message);
  
  return(lockObj.responseXML);
}

// This function is called when the save button is pressed.
// 
// Keeps the lock.
function saveAndKeepLock(uri, xmlDocument)
{  
  var lockObj = WebDAVTools.putXML(uri, xmlDocument, "UTF-8", true);
  if (lockObj.locked == false)
    alert(lockObj.message);
}

// This function will be called when the document/editor is closed.
//
// Releases the lock if the document was locked.
function releaseLock(evt)
{
  WebDAVTools.releaseLock(evt.document.getDocumentURI());
}


// Register all functions.
IO.setLoadXMLFunction(loadAndLock);
IO.setSaveXMLFunction(saveAndKeepLock);

Editor.addEventListener("unload", releaseLock);